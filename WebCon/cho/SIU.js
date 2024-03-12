
// Sử dụng const thay vì var
const imageFiles = [];
const extensions = ['.jpeg', '.png', '.jpg', '.webp']; // Thêm vào đây nếu bạn có thêm định dạng ảnh

for (let i = 1; i <= 1000; i++) {   //so 100 la so anh duoc dua len trang web va quet trong fileANH
    for (let ext of extensions) {
        let fileName = `fileANH/${i}${ext}`;
        imageFiles.push(fileName);
    }
}

// Kiểm tra xem phần tử có id 'imageContainer' có tồn tại hay không
let imageContainer = document.getElementById('imageContainer');
if (imageContainer) {
    imageFiles.forEach(function(file) {
        let img = document.createElement('img');
        img.src = file;
        img.onerror = function() {
            this.style.display = 'none'; // Ẩn ảnh nếu không tải được
        };
        img.addEventListener('click', function() {
            if (confirm('Bạn có muốn tải ảnh này xuống?')) {
                let a = document.createElement('a');
                a.href = file;
                a.download = file;
                a.click();
            }
        });
        imageContainer.appendChild(img);
    });
}



// dark mode
let menuElement = document.getElementById('menu');
let swtextElement = document.getElementById('swtext');

if (swtextElement) {
    swtextElement.addEventListener('click', function(event) {
        document.body.classList.toggle('dark');
        menuElement.classList.toggle('den');
        swtextElement.classList.toggle('vang');
    });
}