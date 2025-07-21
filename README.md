<div dir="rtl">

# تمرین دستگرمی دوم برنامه‌سازی وب
## یاشار پیمایی 401100325

این ریپازیتوری شامل یک web application ساده برای نقاشی با استفاده از React و TypeScript است که بر اساس این [pdf](tamrin_dastgarmi_2.pdf) طراحی شده است.

---

## توضیح فایل‌ها

### App.tsx
<p>
  <strong>کارکرد:</strong> مدیریت state کل برنامه (لیست اشکال و عنوان)، اتصال کامپوننت‌ها و مدیریت import/export.
</p>

---

### types.tsx
<p>
  <strong>کارکرد:</strong> تعریف نوع‌ها و اینترفیس‌های مورد استفاده در کل برنامه.
</p>
<div dir="ltr">


```tsx
export type ShapeType = 'circle' | 'square' | 'triangle';
export interface Shape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
}
```
</div>

---

### ShapeObject.tsx
<p>
  <strong>کارکرد:</strong> رندر هر شکل (دایره، مربع، مثلث) با اندازه و رنگ مناسب.
</p>
<p>
  <strong>مکانیزم:</strong>  
  با توجه به نوع shape، یک div با استایل مناسب رندر می‌شود.
</p>
<div dir="ltr">

```tsx
case 'circle':
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color ? color : typeColorDict['circle'],
      }}
    />
  );
```

</div>

---

### Sidebar.tsx
<p>
  <strong>کارکرد:</strong> نمایش اشکال قابل کشیدن و شروع مکانیزم Drag & Drop.
</p>
<p>
  <strong>مکانیزم Drag & Drop (شروع):</strong>
  هنگام شروع drag، نوع شکل و offset موس نسبت به شکل ذخیره می‌شود.
</p>

<div dir="ltr">

```tsx
const on_drag_start = (ev, shape) => {
  ev.dataTransfer.setData('shape', shape);
  const rect = (ev.target as HTMLElement).getBoundingClientRect();
  const offsetX = ev.clientX - rect.left;
  const offsetY = ev.clientY - rect.top;
  ev.dataTransfer.setData('offsetX', offsetX.toString());
  ev.dataTransfer.setData('offsetY', offsetY.toString());
};
```

</div>

---

### Canvas.tsx
<p>
  <strong>کارکرد:</strong> بوم نقاشی که اشکال روی آن قرار می‌گیرند و مدیریت مکانیزم Drop و حذف اشکال.
</p>
<p>
  <strong>مکانیزم Drag & Drop (پایان):</strong>
  هنگام drop، مختصات دقیق با توجه به offset موس محاسبه می‌شود تا شکل دقیقاً زیر موس قرار گیرد.
</p>

<div dir="ltr">

```tsx
const handleDrop = (ev) => {
  ev.preventDefault();
  const shapeType = ev.dataTransfer.getData('shape');
  const offsetX = parseFloat(ev.dataTransfer.getData('offsetX')) || 0;
  const offsetY = parseFloat(ev.dataTransfer.getData('offsetY')) || 0;
  if (ref.current && shapeType) {
    const rect = ref.current.getBoundingClientRect();
    const x = ev.clientX - rect.left - offsetX + 60;
    const y = ev.clientY - rect.top - offsetY + 60;
    onAddShape({ type: shapeType, x, y });
  }
};

```

</div>

<p>
   حذف شکل با دابل‌کلیک روی آن انجام می‌شود.
</p>
---

### Header.tsx
<p>
  <strong>کارکرد:</strong> نمایش عنوان نقاشی و دکمه‌های import/export.
</p>
<p>
  <strong>مکانیزم Import/Export:</strong>
  <div dir="rtl">
  <p>
    اکسپورت :‌
    داده‌ها به فرمت JSON ذخیره و دانلود می‌شوند. این مکانیزم ابتدا تمام اطلاعات نقاشی (شامل عنوان و موقعیت اشکال) را به یک رشته JSON تبدیل می‌کند، سپس با استفاده از Blob و URL.createObjectURL یک فایل قابل دانلود ایجاد می‌کند.
  </p>
  <p>
    ایمپورت :‌
    فایل JSON خوانده شده و state برنامه با داده‌های آن جایگزین می‌شود. این فرآیند شامل خواندن فایل JSON آپلود شده، تبدیل آن به object و به‌روزرسانی state برنامه با اطلاعات جدید است.
  </p>
  </div>
</p>


<div dir="ltr">

```tsx
const handleExport = () => {
  const data = { title, shapes };
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'shapes.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        if (
          typeof parsed.title === 'string' &&
          Array.isArray(parsed.shapes)
        ) {
          onImport(parsed);
        } else {
          throw new Error();
        }
      } catch {
        message.error('Invalid JSON format');
      }
    };
    reader.readAsText(file);
    return false;
};
```

</div>

---

### Footer.tsx
<p>
  <strong>کارکرد:</strong> نمایش تعداد هر نوع شکل در پایین صفحه.
</p>

</div>
