const multer = require('multer');
const path = require('path');

// تنظیم محل ذخیره‌سازی فایل‌ها
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // فایل‌ها در پوشه uploads ذخیره می‌شوند
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // نام فایل: timestamp + پسوند
  }
});

// فیلتر فایل‌ها (فقط تصاویر مجاز هستند)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('فقط تصاویر مجاز هستند!'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;