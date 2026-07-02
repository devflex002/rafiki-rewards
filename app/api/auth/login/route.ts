import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyPassword } from '@/lib/auth';
import { generateTokenEdge } from '@/lib/auth-edge';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, password } = body;

    // Validation
    if (!phone || !password) {
      return NextResponse.json(
        { error: 'Phone number and password are required' },
        { status: 400 }
      );
    }

    // Find user by phone
    const user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid phone number or password' },
        { status: 401 }
      );
    }

    // Verify password
    const passwordValid = await verifyPassword(password, user.password);

    if (!passwordValid) {
      return NextResponse.json(
        { error: 'Invalid phone number or password' },
        { status: 401 }
      );
    }

    // Generate token
    const token = await generateTokenEdge(user.id);

    return NextResponse.json(
      {
        message: 'Logged in successfully',
        user: {
          id: user.id,
          phone: user.phone,
          email: user.email,
          name: user.name,
          balance: user.balance,
          pendingEarnings: user.pendingEarnings,
          country: user.country,
          bio: user.bio,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
