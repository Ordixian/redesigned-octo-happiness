export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-on-surface/10 w-full py-8">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <span className="text-xl font-bold text-on-surface block mb-2">TrustChain AI</span>
          <p className="text-sm text-on-surface-variant max-w-sm">
            © 2024 TrustChain AI. Digital Integrity for the African Ecosystem.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-on-surface-variant">
          <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-secondary transition-colors">Security Audit</a>
          <a href="#" className="hover:text-secondary transition-colors">Contact Support</a>
        </div>
      </div>
    </footer>
  );
}
