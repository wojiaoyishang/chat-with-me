if (typeof document !== 'undefined') {
    const styleId = 'message-container-animations';

    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
    .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
  `;
        document.head.appendChild(style);
    }
}
