
# queryString

"queryString" kullanımının temel amacı, web sayfalarına dinamik olarak veri göndermek ve bu verilere göre içeriği özelleştirmektir. Özellikle GET isteklerinde, form verilerinin veya kullanıcı tarafından girilen bilgilerin sunucuya aktarılmasında kullanılır.

Web uygulamalarında, queryString değerlerini okumak ve işlemek için sunucu tarafında çeşitli programlama dilleri ve framework'ler kullanılır. Örneğin, PHP'de $_GET global değişkeni, JavaScript'te ise URLSearchParams API'si bu amaçla kullanılır.

JavaScript'te queryString oluşturmanın ve kullanmanın bir çok yolu vardır.
Bunlardan birisi bu projedir.



## queryString Oluşturma


```bash
  const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('userId');
```


## Dökümantasyon

[Dökümantasyon](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)


## Optimizasyon

QueryString kullanırken performans ve güvenlik açısından bazı optimizasyonlar yapmak önemlidir. İşte bu konuda dikkate almanız gereken bazı noktalar ve öneriler:

### 1. Uzunluk Sınırlaması
Sınırlama: URL'lerin maksimum uzunluğu genellikle tarayıcı ve sunucu tarafından sınırlıdır (genellikle 2048 karakter civarında). Çok uzun QueryString'ler kesilebilir veya hata oluşturabilir.
Optimizasyon: Gereksiz parametreleri kaldırın ve anahtar-değer çiftlerini mümkün olduğunca kısa tutun. Eğer büyük miktarda veri göndermeniz gerekiyorsa, POST isteğini kullanmayı düşünün.
### 2. Güvenlik
Sınırlama: QueryString'ler URL'de açıkça görünür, bu nedenle hassas bilgileri içermemelidir.
Optimizasyon: Güvenlik açısından kritik olan verileri (parolalar, kişisel bilgiler vb.) asla QueryString üzerinden göndermeyin. HTTPS kullanarak veri iletişiminizi şifreleyin.
### 3. Kodlama
Sınırlama: URL'ler sadece belirli karakterleri doğrudan destekler. Özel karakterler ve boşluklar gibi bazı karakterler sorunlara yol açabilir.
Optimizasyon: QueryString değerlerini URL kodlaması ile kodlayın (JavaScript'te encodeURIComponent fonksiyonu gibi).
### 4. Veri Yapıları
Sınırlama: Basit anahtar-değer çiftleri bazen yeterli olmayabilir.
Optimizasyon: Daha karmaşık veri yapılarını temsil etmek için JSON gibi formatları kullanıp, bu veriyi bir string olarak kodlayarak QueryString içinde gönderebilirsiniz.
### 5. Önbellekleme ve SEO
Sınırlama: Aynı sayfanın farklı versiyonları için farklı QueryString'ler kullanmak, önbellekleme ve SEO açısından sorun yaratabilir.
Optimizasyon: Gereksiz QueryString parametrelerini kaldırarak, sayfalar arası tutarlılık sağlayın ve önbelleğe alınabilirliği artırın.

### Örnek Kullanım
```bash
  let params = {
    search: "çiçek",
    page: 2
  };

  let queryString = Object.keys(params).map(key => 
    encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
  ).join('&');

  let url = 'http://www.example.com?' + queryString;
  // Oluşan URL: http://www.example.com?search=%C3%A7i%C3%A7ek&page=2
```
Bu örnekte, özel karakterler içeren bir değer (çiçek) URL kodlaması kullanılarak güvenli bir şekilde QueryString'e eklenmiştir. Ayrıca, QueryString'in boyutu da kontrol altında tutulmuştur.
### Unicode Problemi
Tabi özel karakterleri kullanmak bir endpointe istek atarken unicode yüzünden sorun yaratacaktır.
 #### JavaScript'te, bir karakterin Unicode kod noktasına ulaşmak için charCodeAt() fonksiyonunu kullanabilirsiniz. İşte basit bir örnek:
 ```bash
 function getUnicodeCodePoints(str) {
    let codePoints = [];
    for (let i = 0; i < str.length; i++) {
        codePoints.push(str.charCodeAt(i).toString(16));
    }
    return codePoints;
  }

let originalString = "çiçek";
let unicodeCodes = getUnicodeCodePoints(originalString);

console.log(unicodeCodes);  // Örnek çıktı: ['e7', '69', 'e7', '65', '6b']
 ```
Bu fonksiyon, verilen stringdeki her karakter için Unicode kod noktasını hexadecimal olarak döndürür. Örnekte, çiçek kelimesinin her bir karakterinin Unicode kod noktasını hexadecimal olarak listelemektedir.

Eğer URL'deki yüzde işaretli ifadeleri doğrudan Unicode kodlarına çevirmek istiyorsanız, önce bu ifadeleri decode etmek ve ardından yukarıdaki gibi işlemek gerekecektir. Örnek:
```bash
let encodedString = encodeURIComponent("çiçek");
let decodedString = decodeURIComponent(encodedString);

let unicodeCodesDecoded = getUnicodeCodePoints(decodedString);
console.log(unicodeCodesDecoded);  // Aynı çıktıyı verir: ['e7', '69', 'e7', '65', '6b']
```
## URL kodlamasında, her özel karakter yüzde işareti (%) ve ardından gelen iki haneli hexadecimal sayı ile ifade edilir. İşte Türkçe karakterlerin URL kodlamasıyla ilgili bilgiler:

### Büyük Harfler:

Ç: %C3%87 

Ğ: %C4%9E

İ: %C4%B0

Ö: %C3%96

Ş: %C5%9E

Ü: %C3%9C

### Küçük Harfler:

ç: %C3%A7

ğ: %C4%9F

ı: %C4%B1

i: %C4%B1

ö: %C3%B6

ş: %C5%9F

ü: %C3%BC

Bu kodlar, Türkçe karakterlerin URL'de geçerli bir şekilde kullanılmasını sağlamak için gereklidir. Örneğin, bir API isteğinde bu karakterleri kullanmanız gerekiyorsa, bu kodlamayı kullanarak doğru şekilde iletebilirsiniz.