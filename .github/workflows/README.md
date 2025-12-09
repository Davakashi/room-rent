# CI/CD Workflow Documentation - Frontend

## CI Workflow

Энэ workflow нь код орсоны дараа автоматаар дараах алхмуудыг гүйцэтгэнэ:

1. **Code Checkout** - Кодыг татаж авна
2. **Node.js Setup** - Node.js 20 суулгана
3. **Dependencies Install** - npm dependencies суулгана
4. **Lint** - Кодын чанарыг шалгана (ESLint)
5. **Build** - Next.js проектыг build хийж баталгаажуулна
6. **Test** - Нэгж туршилтуудыг ажиллуулна (Jest)
7. **Coverage** - Туршилтын coverage мэдээллийг илгээнэ
8. **Notification** - Тест амжилтгүй бол мэдэгдэл илгээнэ

## Workflow Trigger

Workflow нь дараах үед автоматаар ажиллана:

- `main`, `master`, `develop` branch-д код орсоны дараа
- Pull Request үүсгэхэд

## Технологи

- **Framework:** Next.js 15
- **Test Framework:** Jest + React Testing Library
- **Linter:** ESLint
- **Build Tool:** Next.js Turbopack

## Мэйл Мэдэгдэл Тохируулах

Тест амжилтгүй болгоход мэйл мэдэгдэх системийг ашиглахын тулд GitHub Secrets тохируулах хэрэгтэй:

1. GitHub repository-д орох
2. Settings → Secrets and variables → Actions
3. Дараах secrets нэмэх:
   - `EMAIL_USERNAME` - Gmail хаяг
   - `EMAIL_PASSWORD` - Gmail App Password
   - `NOTIFICATION_EMAIL` - Мэдэгдэл хүлээн авах мэйл хаяг

**Анхаар:** Мэйл мэдэгдэл нь сонголттой. Хэрэв secrets тохируулаагүй бол зөвхөн GitHub issue үүсгэнэ.

## Environment Variables

CI workflow дээр дараах environment variables ашиглана:

- `NODE_ENV=production` - Build хийхэд
- `CI=true` - Test ажиллуулахдаа

## Coverage Reports

Coverage мэдээлэл нь Codecov руу автоматаар илгээгдэнэ (хэрэв тохируулсан бол).

