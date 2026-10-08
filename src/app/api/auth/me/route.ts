import { NextRequest, NextResponse } from 'next/server';
import { withAdminApi, GuardedContext } from '@/lib/api/guard';

export const GET = withAdminApi(async (_req: NextRequest, ctx: GuardedContext) => {
  return NextResponse.json({
    success: true,
    user: ctx.user,
    authenticated: true,
  });
});
