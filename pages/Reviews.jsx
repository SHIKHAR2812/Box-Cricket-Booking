import React, { useState } from 'react';

const Reviews = () => {
  // Sample data - replace with API calls later
  const [reviews, setReviews] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      customerImage: 'https://via.placeholder.com/40',
      rating: 5,
      date: '2024-03-20',
      comment: 'Excellent facilities and great service! The ground was well-maintained and the staff was very helpful.',
      bookingId: 'BK001',
      reply: null,
      status: 'Published'
    },
    {
      id: 2,
      customerName: 'Team Warriors',
      customerImage: 'https://via.placeholder.com/40',
      rating: 4,
      date: '2024-03-19',
      comment: 'Good experience overall. The lighting could be improved a bit.',
      bookingId: 'BK002',
      reply: {
        date: '2024-03-19',
        text: 'Thank you for your feedback. We are working on upgrading our lighting system.'
      },
      status: 'Published'
    },
    {
      id: 3,
      customerName: 'Sarah Smith',
      customerImage: 'https://via.placeholder.com/40',
      rating: 3,
      date: '2024-03-18',
      comment: 'Average experience. The equipment rental process needs improvement.',
      bookingId: 'BK003',
      reply: null,
      status: 'Under Review'
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    rating: '',
    status: '',
    dateRange: '',
    startDate: '',
    endDate: '',
  });

  // Analytics data - replace with API calls later
  const analytics = {
    averageRating: 4.2,
    totalReviews: 156,
    ratingDistribution: {
      5: 80,
      4: 45,
      3: 20,
      2: 8,
      1: 3
    },
    recentTrend: 'up',
    lastMonthAverage: 4.0,
    responseRate: 92,
  };

  const [replyText, setReplyText] = useState('');
  const [activeReplyId, setActiveReplyId] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReplySubmit = (reviewId) => {
    if (!replyText.trim()) return;

    setReviews(prev =>
      prev.map(review =>
        review.id === reviewId
          ? {
              ...review,
              reply: {
                date: new Date().toISOString().split('T')[0],
                text: replyText
              }
            }
          : review
      )
    );
    setReplyText('');
    setActiveReplyId(null);
  };

  const handleStatusChange = (reviewId, newStatus) => {
    setReviews(prev =>
      prev.map(review =>
        review.id === reviewId
          ? { ...review, status: newStatus }
          : review
      )
    );
  };

  const filteredReviews = reviews.filter(review => {
    return (
      (filters.search === '' ||
        review.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
        review.comment.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.rating === '' || review.rating === parseInt(filters.rating)) &&
      (filters.status === '' || review.status === filters.status)
    );
  });

  const getRatingPercentage = (rating) => {
    return (analytics.ratingDistribution[rating] / analytics.totalReviews * 100).toFixed(1);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ratings & Reviews</h1>
          <p className="text-gray-600 mt-1">Manage customer feedback and ratings</p>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
          <div className="flex items-center mt-2">
            <span className="text-3xl font-bold text-gray-900">{analytics.averageRating}</span>
            <div className="flex ml-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${star <= Math.round(analytics.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            {analytics.recentTrend === 'up' ? (
              <span className="text-green-600 text-sm ml-2">↑ 0.2</span>
            ) : (
              <span className="text-red-600 text-sm ml-2">↓ 0.2</span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">Based on {analytics.totalReviews} reviews</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Rating Distribution</h3>
          <div className="space-y-2 mt-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <span className="text-sm text-gray-600 w-6">{rating}</span>
                <div className="flex-1 h-2 mx-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-yellow-400 rounded"
                    style={{ width: `${getRatingPercentage(rating)}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12">{getRatingPercentage(rating)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Monthly Trend</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{analytics.lastMonthAverage}</p>
          <div className="flex items-center mt-1">
            <span className="text-sm text-gray-500">Last month's average</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Response Rate</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{analytics.responseRate}%</p>
          <p className="text-sm text-gray-500 mt-1">Reviews responded to</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="search"
            placeholder="Search reviews"
            className="border rounded-lg px-3 py-2"
            value={filters.search}
            onChange={handleFilterChange}
          />
          <select
            name="rating"
            className="border rounded-lg px-3 py-2"
            value={filters.rating}
            onChange={handleFilterChange}
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <select
            name="status"
            className="border rounded-lg px-3 py-2"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All Status</option>
            <option value="Published">Published</option>
            <option value="Under Review">Under Review</option>
            <option value="Hidden">Hidden</option>
          </select>
          <div className="flex gap-2">
            <input
              type="date"
              name="startDate"
              className="border rounded-lg px-3 py-2 w-1/2"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
            <input
              type="date"
              name="endDate"
              className="border rounded-lg px-3 py-2 w-1/2"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <img
                  src={review.customerImage}
                  alt={review.customerName}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{review.customerName}</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <select
                  value={review.status}
                  onChange={(e) => handleStatusChange(review.id, e.target.value)}
                  className="border rounded-lg px-3 py-1 text-sm"
                >
                  <option value="Published">Published</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-sm text-gray-500 mt-1">Booking ID: {review.bookingId}</p>
            </div>

            {review.reply && (
              <div className="mt-4 pl-4 border-l-4 border-gray-200">
                <p className="text-sm text-gray-600">Admin Reply • {review.reply.date}</p>
                <p className="mt-1 text-gray-700">{review.reply.text}</p>
              </div>
            )}

            {!review.reply && (
              <div className="mt-4">
                {activeReplyId === review.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your reply..."
                      className="w-full border rounded-lg px-3 py-2 h-24"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setActiveReplyId(null);
                          setReplyText('');
                        }}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleReplySubmit(review.id)}
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                      >
                        Submit Reply
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveReplyId(review.id)}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    Reply to Review
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
