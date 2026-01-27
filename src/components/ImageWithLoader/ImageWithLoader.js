import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * ImageWithLoader Component
 *
 * مكون الصورة مع حالة التحميل
 * ==========================
 *
 * يعرض shimmer effect أثناء تحميل الصورة
 * عند اكتمال التحميل، يتم إخفاء الـ shimmer مع fade-in للصورة
 * في حالة الخطأ، يتم عرض placeholder بديل
 *
 * الميزات:
 * - Shimmer animation سلس أثناء التحميل
 * - Fade-in transition عند ظهور الصورة
 * - Error handling مع placeholder بديل
 * - Lazy loading مدمج
 * - دعم RTL للعربية
 * - قيود الأبعاد الاختيارية
 *
 * @component
 */
import { useState, useRef } from 'react';
/**
 * ImageWithLoader Component
 *
 * مكون صورة مع حالة تحميل متقدمة
 * يدعم shimmer effect و error handling
 *
 * @param src - مسار الصورة
 * @param alt - نص بديل للصورة
 * @param width - عرض الصورة (اختياري)
 * @param height - ارتفاع الصورة (اختياري)
 * @param className - للـ styling إضافي
 * @param onLoad - callback عند اكتمال التحميل
 * @param onError - callback عند حدوث خطأ
 * @param placeholder - رمز تعبيري بديل للخطأ
 * @param lazy - تفعيل lazy loading (افتراضي: true)
 */
const ImageWithLoader = ({ src, alt, width, height, className, onLoad, onError, placeholder = '🖼️', lazy = true }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef(null);
    /**
     * معالجة اكتمال تحميل الصورة
     * =================================
     *
     * عند اكتمال التحميل:
     * 1. تحديث حالة isLoaded إلى true
     * 2. إخفاء الـ shimmer تلقائياً
     * 3. استدعاء onLoad callback إذا وجد
     */
    const handleImageLoad = () => {
        setIsLoaded(true);
        setHasError(false);
        onLoad?.();
    };
    /**
     * معالجة خطأ تحميل الصورة
     * ============================
     *
     * عند حدوث خطأ:
     * 1. تحديث حالة hasError إلى true
     * 2. إخفاء الـ shimmer
     * 3. استدعاء onError callback إذا وجد
     */
    const handleImageError = () => {
        setIsLoaded(false);
        setHasError(true);
        onError?.();
    };
    /**
     * عرض حالة الخطأ
     * =================
     *
     * إذا حدث خطأ في تحميل الصورة، عرض placeholder بديل
     */
    if (hasError) {
        return (_jsx("div", { className: `bg-gradient-to-br from-red-500/10 to-orange-500/10 flex items-center justify-center text-5xl text-red-500 border-2 border-dashed border-red-500/20 ${className}`, style: { width: width || '100%', height: height || '200px' }, children: placeholder }));
    }
    return (_jsxs("div", { className: `relative overflow-hidden rounded-inherit ${className}`, style: { width: width || '100%', height: height || 'auto' }, children: [!isLoaded && (_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:1000px_100%] animate-shimmer z-10" })), _jsx("img", { ref: imgRef, src: src, alt: alt, className: `w-full h-full object-cover block rounded-inherit transition-opacity duration-400 ${isLoaded ? 'opacity-100' : 'opacity-0'}`, loading: lazy ? 'lazy' : 'eager', onLoad: handleImageLoad, onError: handleImageError })] }));
};
export default ImageWithLoader;
