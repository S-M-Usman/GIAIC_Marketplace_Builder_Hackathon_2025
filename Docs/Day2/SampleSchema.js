
export const user = {
  name: 'user',
  type: 'document',
  title: 'Users',
  fields: [
    { name: 'userId', type: 'string', title: 'User ID', readOnly: true },
    { name: 'name', type: 'string', title: 'Full Name', validation: Rule => Rule.required() },
    { name: 'email', type: 'email', title: 'Email', validation: Rule => Rule.required().email() },
    { name: 'phone', type: 'string', title: 'Phone', validation: Rule => Rule.min(10).max(15) },
    { 
      name: 'role', 
      type: 'string', 
      title: 'Role', 
      options: { list: ['customer', 'admin'] },
      validation: Rule => Rule.required()
    },
    { name: 'password', type: 'string', title: 'Password', hidden: true },
    { name: 'createdAt', type: 'datetime', title: 'Created At', readOnly: true },
  ],
};


export const product = {
  name: 'product',
  type: 'document',
  title: 'Products',
  fields: [
    { name: 'name', type: 'string', title: 'Product Name', validation: Rule => Rule.required() },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'name', maxLength: 100 } },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'price', type: 'number', title: 'Price', validation: Rule => Rule.required().min(1) },
    { name: 'discountPrice', type: 'number', title: 'Discount Price' },
    { 
      name: 'category', 
      type: 'reference', 
      title: 'Category', 
      to: [{ type: 'category' }], 
      validation: Rule => Rule.required()
    },
    { name: 'images', type: 'array', title: 'Product Images', of: [{ type: 'image' }], validation: Rule => Rule.required().min(1) },
    { 
      name: 'sizes', 
      type: 'array', 
      title: 'Available Sizes', 
      of: [{ type: 'string' }], 
      options: { list: ['S', 'M', 'L', 'XL', 'XXL'] }
    },
    { 
      name: 'status', 
      type: 'string', 
      title: 'Status', 
      options: { list: ['In Stock', 'Out of Stock', 'Coming Soon'] },
      validation: Rule => Rule.required()
    },
    { name: 'createdAt', type: 'datetime', title: 'Created At', readOnly: true },
  ],
};

// 📂 Category Schema
export const category = {
  name: 'category',
  type: 'document',
  title: 'Categories',
  fields: [
    { name: 'name', type: 'string', title: 'Category Name', validation: Rule => Rule.required() },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'name', maxLength: 100 } },
    { name: 'image', type: 'image', title: 'Category Image' },
    { name: 'createdAt', type: 'datetime', title: 'Created At', readOnly: true },
  ],
};

// 🛒 Order Schema
export const order = {
  name: 'order',
  type: 'document',
  title: 'Orders',
  fields: [
    { name: 'orderId', type: 'string', title: 'Order ID', readOnly: true },
    { name: 'user', type: 'reference', title: 'Customer', to: [{ type: 'user' }], validation: Rule => Rule.required() },
    { name: 'products', type: 'array', title: 'Ordered Products', of: [{ type: 'reference', to: [{ type: 'product' }] }] },
    { name: 'totalPrice', type: 'number', title: 'Total Price', validation: Rule => Rule.required().min(1) },
    { 
      name: 'status', 
      type: 'string', 
      title: 'Order Status', 
      options: { list: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] },
      validation: Rule => Rule.required()
    },
    { name: 'orderDate', type: 'datetime', title: 'Order Date', readOnly: true },
  ],
};

// ⭐ Review Schema
export const review = {
  name: 'review',
  type: 'document',
  title: 'Product Reviews',
  fields: [
    { name: 'user', type: 'reference', title: 'Reviewer', to: [{ type: 'user' }] },
    { name: 'product', type: 'reference', title: 'Reviewed Product', to: [{ type: 'product' }] },
    { name: 'rating', type: 'number', title: 'Rating', validation: Rule => Rule.required().min(1).max(5) },
    { name: 'comment', type: 'text', title: 'Review Comment' },
    { name: 'createdAt', type: 'datetime', title: 'Created At', readOnly: true },
  ],
};

// 📝 Blog Schema
export const blogPost = {
  name: 'blogPost',
  type: 'document',
  title: 'Blog Posts',
  fields: [
    { name: 'title', type: 'string', title: 'Title', validation: Rule => Rule.required() },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 100 } },
    { name: 'content', type: 'text', title: 'Content', validation: Rule => Rule.required() },
    { name: 'author', type: 'reference', title: 'Author', to: [{ type: 'user' }] },
    { name: 'tags', type: 'array', title: 'Tags', of: [{ type: 'string' }] },
    { name: 'createdAt', type: 'datetime', title: 'Created At', readOnly: true },
  ],
};

// 📧 Contact Form Schema
export const contactMessage = {
  name: 'contactMessage',
  type: 'document',
  title: 'Contact Messages',
  fields: [
    { name: 'name', type: 'string', title: 'Name', validation: Rule => Rule.required() },
    { name: 'email', type: 'email', title: 'Email', validation: Rule => Rule.required().email() },
    { name: 'message', type: 'text', title: 'Message', validation: Rule => Rule.required().min(10) },
    { name: 'status', type: 'string', title: 'Status', options: { list: ['New', 'Resolved', 'Spam'] } },
    { name: 'createdAt', type: 'datetime', title: 'Created At', readOnly: true },
  ],
};
