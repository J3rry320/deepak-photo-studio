import { NextResponse } from 'next/server';
import { withAdminApi } from '@/lib/api/guard';
import { connectToDatabase } from '@/lib/db/mongodb';
import {
  BookingRequest,
  GeneralEnquiry,
  Package,
  BlogStory,
  Testimonial,
} from '@/models';

export const GET = withAdminApi(async () => {
  try {
    await connectToDatabase();

    const [
      pendingBookings,
      totalBookings,
      unreadEnquiries,
      totalEnquiries,
      activePackages,
      publishedStories,
      totalStories,
      testimonialCount,
    ] = await Promise.all([
      BookingRequest.countDocuments({ status: 'pending' }),
      BookingRequest.countDocuments(),
      GeneralEnquiry.countDocuments({ status: 'new' }),
      GeneralEnquiry.countDocuments(),
      Package.countDocuments({ isActive: true }),
      BlogStory.countDocuments({ isPublished: true }),
      BlogStory.countDocuments(),
      Testimonial.countDocuments(),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        bookings: { pending: pendingBookings, total: totalBookings },
        enquiries: { unread: unreadEnquiries, total: totalEnquiries },
        packages: { active: activePackages },
        stories: { published: publishedStories, total: totalStories },
        testimonials: { total: testimonialCount },
      },
    });
  } catch (error) {
    console.error('[AdminStatsAPI] Error aggregating metrics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve admin stats.' },
      { status: 500 }
    );
  }
});
