// Kiểm tra xem phần tử có id 'home' có tồn tại hay không
let homeElement = document.getElementById('home');
if (homeElement) {
    homeElement.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo(0, 0);
    });
}
// dark mode
let menuElement = document.getElementById('menu');
let menu2Element = document.getElementById('menu2');
let swtextElement = document.getElementById('swtext');
let iElements = document.getElementsByTagName('i');

if (swtextElement) {
    swtextElement.addEventListener('click', function(event) {
        document.body.classList.toggle('dark');
        menuElement.classList.toggle('den');
        menu2Element.classList.toggle('den2');
        swtextElement.classList.toggle('vang');
        // Duyệt qua từng phần tử 'i' và thêm hoặc xóa lớp 'sw'
        for (let i = 0; i < iElements.length; i++) {
            iElements[i].classList.toggle('sw');
        }
        // Thêm mã để thay đổi biểu tượng
        if (swtextElement.textContent == '🌞') {
            swtextElement.textContent = '🌚';
        } else {
            swtextElement.textContent = '🌞';
        }
    });
}

// Lấy danh sách các thẻ <a> trong #file-links
let fileLinks = document.querySelectorAll('#file-links a');

// Thêm class 'no-hover' và 'file-link' vào mỗi thẻ <a>
fileLinks.forEach(function(link) {
    link.classList.add('no-hover', 'file-link');
});

document.getElementById('search').addEventListener('click', function(event) {
    event.preventDefault();
    var originalElement = this;
    var newElement = document.createElement('input');
    newElement.type = 'text';
    newElement.id = 'search';
    newElement.style.width = '0';
    newElement.placeholder = 'Tìm ảnh....';
    setTimeout(function() { newElement.style.width = '200px'; }, 10);
    newElement.addEventListener('blur', function() {
        this.style.width = '0';
        setTimeout(function() { newElement.replaceWith(originalElement); }, 400);
    });

// Tìm kiếm anh và in ra ngay trong trang web
newElement.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        // Xóa tất cả các hình ảnh hiện có
        let searchResults = document.getElementById('search-results');
        while (searchResults.firstChild) {
            searchResults.firstChild.remove();
        }

        fetch('https://api.unsplash.com/search/photos?query=' + this.value + '&per_page=50&client_id=zHlyRQcOvcGIIApz3RaEc5ez0FkJ9M_SSMegzmuXAtc')
            .then(response => response.json())
            .then(data => {
                data.results.forEach(function(photo) {
                    var img = document.createElement('img');
                    img.src = photo.urls.small;
                    // doan ma de tai anh xuong
                    img.onclick = function() {
                        if (confirm('Bạn có muốn tải ảnh này xuống?')) {
                            window.open(photo.urls.full);
                        }
                    };
                    // -----------------------
                    searchResults.appendChild(img);
                });
            });
        this.value = '';
    }
});
// -------------------
    this.replaceWith(newElement);
});

// random 1000 anh va tai anh 
window.onload = function() {
    let container = document.getElementById('image-random');

    for (let i = 0; i < 1000; i++) {
        let img = document.createElement('img');
        let imageUrl = 'https://source.unsplash.com/random?' + i;
        
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                let blobUrl = URL.createObjectURL(blob);
                img.src = blobUrl;
                img.alt = 'Anh trung bay ' + (i + 1);

                // Thêm sự kiện click vào hình ảnh
                img.addEventListener('click', function() {
                    let download = confirm('Bạn có muốn tải ảnh này xuống?');
                    if (download) {
                        // Tạo một liên kết mới, đặt href của nó thành URL của hình ảnh, và kích hoạt sự kiện click của nó
                        let link = document.createElement('a');
                        link.href = blobUrl; // Sử dụng blobUrl đã được lưu
                        link.download = '';
                        link.click();
                    }
                });

                container.appendChild(img);
            });
    }
}