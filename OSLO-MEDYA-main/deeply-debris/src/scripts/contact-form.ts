/**
 * İletişim formu. Backend yoksa sahte "gönderildi" demez:
 *  - PUBLIC_FORM_ENDPOINT tanımlıysa JSON olarak oraya POST eder, yanıt başarılıysa onay gösterir.
 *  - Tanımlı değilse WhatsApp'ı hazırlanmış mesajla açar; kullanıcı göndermeden mesaj iletilmiş sayılmaz.
 */
const messages = {
  name: 'Adınızı ve soyadınızı yazın.',
  phone: 'Telefon numaranızı yazın.',
  phoneInvalid: 'Geçerli bir telefon numarası girin.',
  emailInvalid: 'Geçerli bir e-posta adresi girin.',
  message: 'Mesajınızı kısaca yazın.',
  consent: 'Devam etmek için aydınlatma metnini onaylayın.',
};

function setError(field: HTMLElement | null, text: string | null) {
  if (!field) return;
  const error = field.querySelector<HTMLElement>('[data-error]');
  const control = field.querySelector<HTMLElement>('input, textarea');
  if (text) {
    if (error) {
      error.textContent = text;
      error.hidden = false;
    }
    control?.setAttribute('aria-invalid', 'true');
  } else {
    if (error) {
      error.textContent = '';
      error.hidden = true;
    }
    control?.removeAttribute('aria-invalid');
  }
}

export function initContactForm() {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form || form.dataset.bound) return;
  form.dataset.bound = 'true';

  const status = document.querySelector<HTMLElement>('[data-form-status]');
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');

  const value = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | null)?.value.trim() ?? '';
  const fieldOf = (name: string) => (form.elements.namedItem(name) as HTMLElement | null)?.closest<HTMLElement>('[data-field]') ?? null;

  const validate = () => {
    const digits = value('phone').replace(/\D/g, '');
    const checks: [string, string | null][] = [
      ['name', value('name').length < 3 ? messages.name : null],
      ['phone', !digits ? messages.phone : digits.length < 10 ? messages.phoneInvalid : null],
      ['email', value('email') && !/^\S+@\S+\.\S+$/.test(value('email')) ? messages.emailInvalid : null],
      ['message', value('message').length < 5 ? messages.message : null],
    ];
    let firstInvalid: HTMLElement | null = null;
    for (const [name, error] of checks) {
      setError(fieldOf(name), error);
      if (error && !firstInvalid) firstInvalid = form.elements.namedItem(name) as HTMLElement;
    }
    const consent = form.elements.namedItem('consent') as HTMLInputElement | null;
    const consentField = consent?.closest<HTMLElement>('[data-consent]') ?? null;
    const consentError = consent?.checked ? null : messages.consent;
    const consentMessage = consentField?.querySelector<HTMLElement>('[data-error]');
    if (consentMessage) {
      consentMessage.textContent = consentError ?? '';
      consentMessage.hidden = !consentError;
    }
    if (consentError && !firstInvalid) firstInvalid = consent;
    firstInvalid?.focus();
    return !firstInvalid;
  };

  const compose = () => {
    const lines = ['Merhaba, Oslo Medya web sitesinden yazıyorum.', '', `Ad soyad: ${value('name')}`];
    if (value('company')) lines.push(`Şirket / marka: ${value('company')}`);
    lines.push(`Telefon: ${value('phone')}`);
    if (value('email')) lines.push(`E-posta: ${value('email')}`);
    lines.push('', value('message'));
    return lines.join('\n');
  };

  const show = (html: string, tone: 'success' | 'error') => {
    if (!status) return;
    status.hidden = false;
    status.dataset.tone = tone;
    status.innerHTML = html;
    status.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!validate()) return;

    const whatsapp = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(compose())}`;
    const endpoint = form.dataset.endpoint;

    if (!endpoint) {
      window.open(whatsapp, '_blank', 'noopener');
      show(
        `<strong>WhatsApp penceresi açıldı.</strong> Mesajınız hazır, göndermeniz yeterli. Açılmadıysa <a href="${whatsapp}" target="_blank" rel="noopener noreferrer">buraya tıklayın</a>.`,
        'success',
      );
      return;
    }

    if (submit) submit.disabled = true;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: value('name'),
          company: value('company'),
          phone: value('phone'),
          email: value('email'),
          message: value('message'),
          source: location.href,
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      show('<strong>Mesajınız alındı.</strong> En kısa sürede size dönüş yapacağız.', 'success');
    } catch {
      show(
        `<strong>Mesaj gönderilemedi.</strong> Lütfen <a href="${whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp'tan</a> yazın ya da bizi arayın.`,
        'error',
      );
    } finally {
      if (submit) submit.disabled = false;
    }
  });
}
