const STORAGE_KEY = 'osloContent';

const readContent = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return window.siteContent;
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('JSON çözümlenemedi', error);
    return window.siteContent;
  }
};

const writeContent = data => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const resetContent = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
};

const populateForms = content => {
  document.getElementById('heroHeadline').value = content.hero.headline;
  document.getElementById('heroSubheading').value = content.hero.subheading;
  document.getElementById('heroCtaLabel').value = content.hero.ctaLabel;
  document.getElementById('heroCtaLink').value = content.hero.ctaLink;

  document.getElementById('contactPhone').value = content.contact.phone;
  document.getElementById('contactMail').value = content.contact.mail;
  document.getElementById('contactAddress').value = content.contact.address;
  document.getElementById('contactWp').value = content.contact.wpLink;

  document.getElementById('jsonEditor').value = JSON.stringify(content, null, 2);
};

const initAdmin = () => {
  if (!window.siteContent) {
    console.error('siteContent yüklenemedi. content.js dosyasını kontrol edin.');
    document.body.innerHTML = '<div style="padding: 40px; text-align: center;"><h1>Hata</h1><p>İçerik dosyası yüklenemedi. Lütfen sayfayı yenileyin.</p></div>';
    return;
  }
  const currentContent = readContent();
  populateForms(currentContent);

  document.getElementById('quickForm').addEventListener('submit', event => {
    event.preventDefault();
    const updated = {
      ...currentContent,
      hero: {
        ...currentContent.hero,
        headline: document.getElementById('heroHeadline').value,
        subheading: document.getElementById('heroSubheading').value,
        ctaLabel: document.getElementById('heroCtaLabel').value,
        ctaLink: document.getElementById('heroCtaLink').value
      },
      contact: {
        ...currentContent.contact,
        phone: document.getElementById('contactPhone').value,
        mail: document.getElementById('contactMail').value,
        address: document.getElementById('contactAddress').value,
        wpLink: document.getElementById('contactWp').value,
        whatsapp: currentContent.contact.whatsapp
      }
    };
    writeContent(updated);
    alert('Güncellendi!');
  });

  document.getElementById('jsonForm').addEventListener('submit', event => {
    event.preventDefault();
    try {
      const parsed = JSON.parse(document.getElementById('jsonEditor').value);
      writeContent(parsed);
      alert('JSON kaydedildi.');
    } catch (error) {
      alert('Hatalı JSON: ' + error.message);
    }
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('Varsayılan içeriğe dönmek istediğinize emin misiniz?')) {
      resetContent();
    }
  });
};

document.addEventListener('DOMContentLoaded', initAdmin);
