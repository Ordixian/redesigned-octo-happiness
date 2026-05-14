import { useState, FormEvent, ChangeEvent } from 'react';
import { Camera, Package, ShieldCheck, Sparkles, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { runVerification } from '../api/client';

export default function Verify() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [productData, setProductData] = useState({
    name: '',
    batch: '',
    nafdac: '',
    vendor: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload a product image first.");
      return;
    }
    
    setLoading(true);
    const formData = new FormData();
    formData.append('product_name', productData.name);
    formData.append('nafdac_no', productData.nafdac);
    formData.append('price', "5000"); // Hardcoded for now per backend requirement
    formData.append('vendor_name', productData.vendor);
    formData.append('image', image);

    try {
      const result = await runVerification(formData);
      // Navigate to results and pass the backend analysis
      navigate('/result', { state: { data: result } });
    } catch (error) {
      console.error("Verification failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-12 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-on-surface mb-2">Forensic Intelligence</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Section */}
        <section className="glass-panel p-8 rounded-2xl border border-on-surface/10">
          <div className="flex items-center gap-3 mb-10 text-on-surface">
            <Package /> <h2 className="text-2xl font-bold">Product Registry</h2>
          </div>

          <div className="group border-2 border-dashed border-on-surface/10 rounded-2xl p-16 flex flex-col items-center justify-center bg-surface-container-low relative">
            <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            <Camera size={48} className="text-on-surface-variant mb-4" />
            <p className="text-sm font-bold text-on-surface">{image ? image.name : "Upload Product Image"}</p>
          </div>

          <div className="mt-8 space-y-6">
            <input name="name" onChange={handleInputChange} placeholder="Product Name" className="w-full h-12 px-4 rounded-xl border border-on-surface/10 bg-white" />
            <div className="grid grid-cols-2 gap-4">
               <input name="batch" onChange={handleInputChange} placeholder="Batch No" className="w-full h-12 px-4 rounded-xl border border-on-surface/10 bg-white" />
               <input name="nafdac" onChange={handleInputChange} placeholder="NAFDAC No" className="w-full h-12 px-4 rounded-xl border border-on-surface/10 bg-white" />
            </div>
          </div>
        </section>

        {/* Vendor Section */}
        <section className="glass-panel p-8 rounded-2xl border border-on-surface/10">
          <div className="flex items-center gap-3 mb-10 text-secondary">
            <ShieldCheck /> <h2 className="text-2xl font-bold text-on-surface">Vendor Intelligence</h2>
          </div>
          <input name="vendor" onChange={handleInputChange} placeholder="Vendor/Business Name" className="w-full h-12 px-4 rounded-xl border border-on-surface/10 bg-white" />
        </section>
      </div>

      <div className="flex flex-col items-center gap-6">
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="bg-on-tertiary-container text-white px-12 h-14 rounded-xl font-bold flex items-center gap-3 shadow-xl"
        >
          <Sparkles size={20} />
          {loading ? "Analyzing Neural Data..." : "Run AI Verification"}
        </button>
      </div>
    </div>
  );
}
