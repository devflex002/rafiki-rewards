import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyTokenEdge, getTokenFromRequest } from '@/lib/auth-edge';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = await verifyTokenEdge(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        referrals: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            status: true,
            signupDate: true,
            earnings: true,
          },
        },
        transactions: {
          select: {
            id: true,
            type: true,
            amount: true,
            status: true,
            method: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        user: {
          id: user.id,
          phone: user.phone,
          email: user.email,
          name: user.name,
          balance: user.balance,
          pendingEarnings: user.pendingEarnings,
          country: user.country,
          bio: user.bio,
          role: user.role,
          createdAt: user.createdAt,
          referrals: user.referrals,
          transactions: user.transactions,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
