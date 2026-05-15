import { useState, FormEvent, ChangeEvent } from 'react';
import { Camera, Package, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { runVerification } from '../api/client';

export default function Verify() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage]     = useState<File | null>(null);
  const [error, setError]     = useState<string | null>(null);
  const [productData, setProductData] = useState({
    name: '', batch: '', nafdac: '', vendor: '', price: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!productData.name.trim()) return setError('Product name is required.');
    if (!productData.nafdac.trim()) return setError('NAFDAC number is required.');
    if (!productData.vendor.trim()) return setError('Vendor name is required.');

    setLoading(true);
    const formData = new FormData();
    formData.append('product_name', productData.name);
    formData.append('nafdac_no', productData.nafdac);
    formData.append('price', productData.price || '5000');
    formData.append('vendor_name', productData.vendor);
    if (image) formData.append('image', image);

    try {
      const result = await runVerification(formData);
      navigate('/result', { state: { data: result } });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Verification failed. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-12 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-on-surface mb-2">Product & Vendor Intelligence</h1>
        <p className="text-on-surface-variant max-w-2xl text-base">
          Our AI cross-references global databases and NAFDAC registries in real-time.
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 rounded-xl bg-error/10 border border-error/30 text-error text-sm font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

        {/* Product */}
        <section className="glass-panel p-8 rounded-2xl border border-on-surface/10">
          <div className="flex items-center gap-3 mb-10 text-on-surface">
            <Package />
            <h2 className="text-2xl font-bold">Product Registry</h2>
          </div>

          <div className="group border-2 border-dashed border-on-surface/10 rounded-2xl p-12 flex flex-col items-center justify-center bg-surface-container-low relative cursor-pointer hover:bg-surface-container-high transition-all">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Camera size={48} className="text-on-surface-variant mb-4" />
            <p className="text-sm font-bold text-on-surface">
              {image ? image.name : 'Upload Product Image (optional)'}
            </p>
            <p className="text-xs text-on-surface-variant mt-1">PNG, JPG up to 10MB</p>
          </div>

          <div className="mt-8 space-y-6">
            <input
              name="name"
              onChange={handleInputChange}
              placeholder="Product Name *"
              className="w-full h-12 px-4 rounded-xl border border-on-surface/10 bg-white focus:ring-2 focus:ring-secondary outline-none"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                name="batch"
                onChange={handleInputChange}
                placeholder="Batch No"
                className="w-full h-12 px-4 rounded-xl border border-on-surface/10 bg-white focus:ring-2 focus:ring-secondary outline-none"
              />
              <input
                name="nafdac"
                onChange={handleInputChange}
                placeholder="NAFDAC No *"
                className="w-full h-12 px-4 rounded-xl border border-on-surface/10 bg-white focus:ring-2 focus:ring-secondary outline-none"
              />
            </div>
            <input
              name="price"
              type="number"
              onChange={handleInputChange}
              placeholder="Price (₦)"
              className="w-full h-12 px-4 rounded-xl border border-on-surface/10 bg-white focus:ring-2 focus:ring-secondary outline-none"
            />
          </div>

          <div className="mt-8 p-4 bg-on-tertiary-container/5 rounded-xl flex items-center gap-4 border border-on-tertiary-container/10">
            <div className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-on-tertiary-container opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-on-tertiary-container" />
            </div>
            <p className="text-xs font-bold text-on-tertiary-container">
              TrustChain AI is ready to analyze labels and barcodes.
            </p>
          </div>
        </section>

        {/* Vendor */}
        <section className="glass-panel p-8 rounded-2xl border border-on-surface/10">
          <div className="flex items-center gap-3 mb-10 text-secondary">
            <ShieldCheck />
            <h2 className="text-2xl font-bold text-on-surface">Vendor Intelligence</h2>
          </div>

          <div className="space-y-6">
            <input
              name="vendor"
              onChange={handleInputChange}
              placeholder="Vendor / Business Name *"
              className="w-full h-12 px-4 rounded-xl border border-on-surface/10 bg-white focus:ring-2 focus:ring-secondary outline-none"
            />
            <p className="text-sm text-on-surface-variant">
              Enter the vendor or business name you're purchasing from. Our system will cross-check against known registries and complaint records.
            </p>

            <div className="p-6 bg-white border border-on-surface/10 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">Entity Trust Score</p>
                  <p className="text-xs text-on-surface-variant">Calculated upon submission</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full">
                <span className="text-xs font-bold text-on-surface-variant">Pending</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col items-center gap-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={loading}
          className="bg-on-tertiary-container text-white px-12 h-14 rounded-xl font-bold flex items-center gap-3 shadow-xl hover:shadow-on-tertiary-container/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Analyzing Neural Data...
            </>
          ) : (
            <>
              <Sparkles size={20} fill="currentColor" />
              Run AI Verification
            </>
          )}
        </motion.button>
        <p className="text-sm text-on-surface-variant font-medium">
          Verification usually takes 3–5 seconds to scan all registries.
        </p>
      </div>
    </div>
  );
}
