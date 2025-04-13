import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // 用于记录每个产品对应的评论表单数据（评论内容和评分）
  const [reviewForms, setReviewForms] = useState({});
  // 用于控制每个产品是否显示评论表单
  const [showReviewForm, setShowReviewForm] = useState({});

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/api/products');
      // 假设返回的数据中，每个产品对象中包含 remarks 字段数组
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch products');
      setIsLoading(false);
    }
  };

  // 切换评论表单显示状态
  const handleToggleReviewForm = (productId) => {
    setShowReviewForm((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // 更新评论表单字段的值
  const handleReviewChange = (productId, field, value) => {
    setReviewForms((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], [field]: value },
    }));
  };

  // 提交评论数据
  const submitReview = async (productId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    const reviewData = reviewForms[productId] || {};
    if (!reviewData.content || !reviewData.rating) {
      alert('请输入评论内容以及1到5之间的评分');
      return;
    }
    try {
      const response = await axiosInstance.post(
        '/api/remarks',
        {
          product: productId,
          content: reviewData.content,
          rating: reviewData.rating,
          images: []
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (response.data) {
        alert('评论提交成功！');
       
        setReviewForms((prev) => ({
          ...prev,
          [productId]: { content: '', rating: '' },
        }));
        setShowReviewForm((prev) => ({
          ...prev,
          [productId]: false,
        }));
        fetchProducts();
      }
    } catch (error) {
      alert(error.response?.data?.message || '评论提交失败，请稍后重试');
    }
  };

  // 管理员编辑操作
  const handleEditProduct = (productId) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  // 管理员删除操作
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('确认删除该产品？')) {
      try {
        await axiosInstance.delete(`/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        alert('产品删除成功');
        fetchProducts();
      } catch (error) {
        alert(error.response?.data?.message || '删除失败');
      }
    }
  };

  const handlePurchase = async (productId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const response = await axiosInstance.post(
        `/api/products/${productId}/purchase`,
        { productId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (response.data.success) {
        alert(`
          Purchase Successful!
          Order ID: ${response.data.data.orderId}
          Product: ${response.data.data.productName}
          Total Price: $${response.data.data.totalPrice}
        `);
        fetchProducts();
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 'Purchase failed, please try again'
      );
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Available Products</h1>

        {/* 显示管理员添加产品按钮 */}
        {user && user.role === 'admin' && (
          <div className="mb-8">
            <button 
              onClick={() => navigate('/admin/products/add')}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add New Product
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={product.image || '/default-product.jpg'} 
                alt={product.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  {product.category && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {product.category}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="space-y-2 mb-4">
                  <p>
                    <span className="font-semibold">Price:</span> ${product.price}
                  </p>
                  {product.stock !== undefined && (
                    <p>
                      <span className="font-semibold">Stock:</span> {product.stock}
                    </p>
                  )}
                </div>

                {/* 显示产品现有的评论和评分 */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Reviews:</h4>
                  {product.remarks && product.remarks.length > 0 ? (
                    product.remarks.map((remark, index) => (
                      <div key={index} className="border-b pb-1 mb-1">
                        <p className="text-sm">
                          <span className="font-bold">Rating:</span> {remark.rating}/5
                        </p>
                        <p className="text-sm">{remark.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No reviews yet.</p>
                  )}
                </div>

                {/* 如果用户为管理员，则显示编辑和删除按钮，否则显示评论/评分功能 */}
                {user && user.role === 'admin' ? (
                  <div className="flex gap-2 mb-4">
                    <button 
                      onClick={() => handleEditProduct(product._id)}
                      className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product._id)}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div className="mb-4">
                    <button 
                      onClick={() => handleToggleReviewForm(product._id)}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                    >
                      {showReviewForm[product._id] ? 'Hide Review Form' : 'Add Review'}
                    </button>
                    {showReviewForm[product._id] && (
                      <div className="mt-4 space-y-2">
                        <textarea
                          placeholder="Write your review here..."
                          value={reviewForms[product._id]?.content || ''}
                          onChange={(e) => handleReviewChange(product._id, 'content', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                        <input
                          type="number"
                          placeholder="Rating (1-5)"
                          min="1"
                          max="5"
                          value={reviewForms[product._id]?.rating || ''}
                          onChange={(e) => handleReviewChange(product._id, 'rating', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                        <button
                          onClick={() => submitReview(product._id)}
                          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                          Submit Review
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 购买产品按钮 */}
                <button 
                  onClick={() => handlePurchase(product._id)}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                  disabled={product.stock === 0}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
