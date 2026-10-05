---
title: "Web sitesi güvenliği ve internet altyapısı: İşletmeler için temel önlemler"
description: "Web sitenizi saldırılara ve kesintilere karşı korumak için SSL, CDN, yedekleme, güncelleme, şifre ve e-posta güvenliği gibi temel önlemleri özetliyoruz."
pubDate: 2025-12-10
updatedDate: 2026-10-01
category: "Teknoloji"
---

Web siteniz dijital vitrininizdir. Bir siber saldırı, bir DDoS atağı ya da altyapı kaynaklı bir kesinti sitenizi saatlerce, hatta günlerce erişilemez duruma getirebilir; bunun karşılığı müşteri kaybı, gelir kaybı ve itibar zararıdır. Bu nedenle güvenlik ve erişilebilirlik birlikte düşünülmelidir: ilki sitenizi ve verilerinizi saldırılardan, ikincisi sunucu, ağ ve alan adı altyapısındaki aksaklıklardan korumayı amaçlar.

Aşağıda her iki alanda da işletmelerin alabileceği temel önlemleri sırasıyla ele alıyoruz.

## HTTPS ve SSL sertifikası

SSL sertifikası, site ile ziyaretçi arasındaki veri iletişimini şifreler. HTTPS bağlantısı sayesinde kredi kartı bilgileri, kişisel bilgiler ve şifreler gibi veriler iletim sırasında korunur. Modern tarayıcılar sertifikası olmayan siteleri güvenli değil olarak işaretler; bu uyarı ziyaretçinin güvenini ilk anda zedeler. HTTPS ayrıca Google'ın sıralamada dikkate aldığı sinyallerden biridir.

Sertifikanın süresi dolduğunda da tarayıcılar ziyaretçilere uyarı gösterir. Bu yüzden otomatik yenilemeyi açın ya da yenileme tarihini takip edin.

## CDN, WAF ve DDoS koruması

DDoS saldırısı, bir siteyi aşırı sayıda istekle yavaşlatmayı ya da erişilemez kılmayı amaçlar. Cloudflare ve Sucuri gibi sağlayıcılar; otomatik DDoS koruması, bot trafiği filtreleme ve web uygulama güvenlik duvarı (WAF) gibi katmanlar sunar. WAF, zararlı istekleri siteye ulaşmadan engellemeye çalışır; Cloudflare gibi büyük ağlar bunu dünya genelinde dağıtılmış veri merkezleri üzerinden yapar.

Bu hizmetlerin CDN (içerik dağıtım ağı) özelliği ise içerikleri ziyaretçiye en yakın sunucudan göndererek sayfa yüklenme süresini kısaltır. Böylece aynı yapı hem güvenlik hem de hız tarafında işe yarar.

## Bulut altyapısı ve ölçeklenebilirlik

AWS gibi bulut sağlayıcıları; sunucu (EC2), depolama (S3), içerik dağıtımı (CloudFront) ve DNS yönetimi (Route 53) gibi servisler sunar. Otomatik ölçeklendirme, trafik arttığında sunucu kapasitesini kendiliğinden yükselterek yoğun dönemlerde sitenin çökme riskini azaltır. Bu esneklik büyüyen işletmeler için uygundur; yine de hizmetlerin ihtiyaca göre yapılandırılması ve maliyetinin takip edilmesi gerekir.

## Kesintilere ve veri kaybına hazırlık

İnternet kesintileri; fiber kablo kopmaları, DNS sorunları ya da büyük ölçekli siber saldırılar gibi nedenlerle ortaya çıkabilir. Barındırma ya da ağ hizmeti aldığınız sağlayıcıdaki bir aksaklık, siz hata yapmamış olsanız bile sitenizi erişilemez kılabilir. Bu yüzden hedef, kesintiyi tümüyle önlemek değil, kesinti sırasında ve sonrasında işinizi sürdürebilmek olmalıdır:

- **Düzenli yedekleme:** Otomatik günlük yedekler alın, veritabanını ayrıca yedekleyin ve kopyaları farklı konumlarda saklayın.
- **Yedeği test etme:** Yedeklerin gerçekten geri yüklenebildiğini düzenli aralıklarla deneyin.
- **Felaket kurtarma planı:** Bir sorun çıktığında kimin ne yapacağını ve siteyi hangi adımlarla geri getireceğinizi önceden yazın.
- **Birden fazla CDN:** Kesintinin maliyetinin yüksek olduğu sitelerde tek bir sağlayıcıya bağımlı kalmamak için birden fazla CDN kullanmayı düşünebilirsiniz.
- **Çevrimdışı çalışabilen yöntemler:** Randevu ya da sipariş gibi kritik süreçler için internet kesildiğinde kullanacağınız bir yedek yöntem belirleyin.

## Şifre ve iki faktörlü kimlik doğrulama

Güçlü şifre, saldırılara karşı ilk savunma hattınızdır. En az 12 karakterden oluşan, büyük ve küçük harf, rakam ve özel karakter içeren şifreler kullanın ve aynı şifreyi birden fazla platformda tekrar etmeyin. Bunun için LastPass, 1Password ya da Bitwarden gibi bir şifre yöneticisinden yararlanabilirsiniz.

İki faktörlü kimlik doğrulama (2FA), şifre ele geçirilse bile hesaba girişi zorlaştıran ek bir katmandır; e-posta, SMS ya da bir doğrulama uygulaması ile etkinleştirilebilir. Site yönetim paneli, hosting ve e-posta hesapları için iki faktörlü doğrulamayı öncelikle açın.

## Kimlik avı ve e-posta güvenliği

Kimlik avı (phishing), sahte e-posta, mesaj ya da web siteleri aracılığıyla kişisel bilgileri çalmaya çalışan saldırılardır. Şüpheli e-postalardaki bağlantılara tıklamayın, göndericinin kimliğini doğrulayın ve beklenmedik e-postalardaki ekleri açmayın. Çalışanlarınızı bu konuda bilgilendirin ve farkındalık eğitimlerini düzenli aralıklarla tekrarlayın.

E-posta tarafında SPF, DKIM ve DMARC kayıtlarını yapılandırmak, alan adınız adına sahte e-posta gönderilmesini zorlaştırır. Spam filtreleri de gelen kutusundaki riski azaltır.

## Güncellemeler ve güvenlik yamaları

Web sitenizi, hosting sunucunuzu ve kullandığınız tüm yazılımları güncel tutmak, bilinen güvenlik açıklarını kapatmanın temel yoludur. WordPress, Joomla ya da Drupal gibi içerik yönetim sistemlerini; eklentileri, temaları ve sunucu yazılımlarını düzenli olarak güncelleyin. Mümkün olan yerlerde otomatik güncellemeyi etkinleştirin, güvenlik yamalarını geciktirmeyin ve büyük bir güncellemeden önce yedek alın.

## KVKK ve veri güvenliği

Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca müşteri verilerinin güvenliği işletmenin yasal sorumluluğundadır. Bir veri sızıntısı yasal yaptırımlara ve marka itibarının zedelenmesine yol açabilir. Güvenli hosting, şifreleme, erişim kontrolü ve gizlilik politikası, KVKK'ya uyum için gerekli önlemler arasındadır. Kimin hangi veriye erişebildiğini de düzenli olarak gözden geçirin.

## Mobil cihazlar ve güvenlik denetimi

Telefon ve tabletler de işletmenizin dijital varlıklarının bir parçasıdır. Cihazlarda güçlü şifre, biyometrik doğrulama, cihaz şifreleme ve uzaktan silme özelliklerini etkinleştirin ve uygulamaları güncel tutun. Çok sayıda cihaz kullanılan işletmelerde mobil cihaz yönetimi (MDM) çözümleri bu politikaları merkezden uygulamaya yardımcı olur.

Düzenli güvenlik denetimleri ve sızma (penetrasyon) testleri ise sitenizdeki açıkları saldırganlardan önce bulmanızı sağlar. Bu işi bir güvenlik uzmanı yürütür, bulguları raporlar ve çözüm önerileri sunar. Denetimi en az yılda bir kez yaptırmak iyi bir başlangıçtır.

## Kontrol listesi

- Sitenizde HTTPS bağlantısını etkinleştirin ve sertifikanın otomatik yenilenmesini sağlayın.
- DDoS koruması, WAF ve CDN gibi bir koruma katmanı kullanın.
- Site ve veritabanı yedeklerini otomatikleştirin; geri yüklemeyi düzenli olarak test edin.
- CMS, eklenti, tema ve sunucu yazılımlarını güncel tutun.
- Güçlü ve benzersiz şifreler kullanın; yönetim paneli ve e-posta hesaplarında iki faktörlü doğrulamayı açın.
- SPF, DKIM ve DMARC kayıtlarını yapılandırın; çalışanları kimlik avına karşı bilgilendirin.
- Kişisel veri işlenen alanlarda KVKK gerekliliklerini kontrol edin.
- Yılda en az bir kez güvenlik denetimi yaptırın.

Oslo Medya olarak web sitesi ve özel yazılım projelerinde SSL sertifikası, hosting ve güvenlik gereksinimlerinin planlanması konusunda destek veriyoruz.
