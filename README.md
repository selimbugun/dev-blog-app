# DevBlog - Modern Blog Platform

Modern ve kullanıcı dostu bir blog platformu. Next.js 15 ve React 19 ile geliştirildi. Kayıt olan herkes blog yazısı paylaşabilir ve yorum yapabilir.

## 🌐 Live Demo

Projeyi buradan inceleyebilirsiniz: [https://dev-blog-app-five.vercel.app](https://dev-blog-app-five.vercel.app)

## ✨ Özellikler

- **User Authentication**: Giriş yapma, kayıt olma, şifre sıfırlama
- **Blog Yazısı Yönetimi**: Rich text editor ile yazı ekleme ve silme
- **Yorum Sistemi**: Blog yazılarına yorum ekleme/silme
- **Profil Yönetimi**: Kişisel bilgileri düzenleme
- **Responsive Design**: Tüm cihazlarda uyumlu tasarım

## 🛠️ Teknolojiler

- **Frontend**: Next.js 15.3.2, React 19.0.0
- **UI Kütüphanesi**: Material-UI (MUI)
- **Text Editor**: TipTap (Rich Text Editor)
- **Database & Auth**: Supabase
- **Form Yönetimi**: React Hook Form
- **Icons**: React Icons
- **Security**: DOMPurify (HTML sanitization)
- **Deployment**: Vercel

## 🚀 Kurulum

### Gereksinimler

- Node.js (v18+)
- npm veya yarn

### Adımlar

1. Repository'yi clone edin:

```bash
git clone https://github.com/selimbugun/dev-blog-app.git
cd devblog
```

2. Dependencies'leri yükleyin:

```bash
npm install
```

3. Environment variables dosyası oluşturun (`.env.local`):

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Development server'ı başlatın:

```bash
npm run dev
```

5. [http://localhost:3000](http://localhost:3000) adresinden uygulamayı görüntüleyin.

## 📊 Supabase Setup

### Database Tabloları

Supabase'de aşağıdaki tabloları oluşturmanız gerekiyor:

```sql
-- Users extra bilgileri tablosu
CREATE TABLE users_extra (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  fullname TEXT,
  username TEXT UNIQUE,
  date_of_birth TIMESTAMP,
  avatar_url TEXT
);

-- Blog posts tablosu
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  published BOOLEAN DEFAULT true,
  cover_image TEXT
);

-- Comments tablosu
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index'ler (performans için)
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_users_extra_user_id ON users_extra(user_id);
```

### Row Level Security (RLS)

```sql
-- Users_extra tablosu için RLS
ALTER TABLE users_extra ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" ON users_extra
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON users_extra
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON users_extra
  FOR UPDATE USING (auth.uid() = user_id);

-- Posts tablosu için RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published posts" ON posts
  FOR SELECT USING (published = true);

CREATE POLICY "Authors can view their own posts" ON posts
  FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "Users can create posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own posts" ON posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own posts" ON posts
  FOR DELETE USING (auth.uid() = author_id);

-- Comments tablosu için RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" ON comments
  FOR DELETE USING (auth.uid() = user_id);
```

## 🎨 Kullanım

### Blog Yazısı Yazma

1. Siteye kayıt olun veya giriş yapın
2. "İçerik Ekle" butonuna tıklayın
3. TipTap editor'ü kullanarak yazınızı oluşturun
4. "Paylaş" butonuna tıklayın

### Yorum Yapma

1. Herhangi bir blog yazısına giriş yapın
2. Sayfanın altındaki yorum bölümünü kullanın
3. Yorumunuzu yazıp "Yorum Yap" butonuna tıklayın

### Profil Düzenleme

1. Sağ üst köşedeki profil menüsüne tıklayın
2. "Profil" seçeneğini seçin
3. Bilgilerinizi güncelleyip kaydedin

## 📁 Proje Yapısı

```
devblog/
├── app/                      # Next.js 15 app directory
│   ├── account/              # Authentication sayfaları
│   ├── blog/                 # Blog sayfaları
│   ├── api/                  # Api routeları
│   └── globals.css           # Global styles
├── components/               # React component'ler
├── lib/                      # Supabase Bağlantı Dosyaları
├── hooks/                    # Hooks
├── utils/                    # Utility functions
├── public/                   # Static assets
└── styles/                   # CSS dosyaları
```

## 🔧 Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint çalıştır
```

## 🚀 Deployment

Proje Vercel'de deploy edilmiştir.

## 🔒 Güvenlik

- Supabase Row Level Security (RLS) kullanılmıştır
- HTML content DOMPurify ile sanitize edilir
- Authentication Supabase Auth ile yönetilir

---

**Made with ❤️ using Next.js and Supabase**
