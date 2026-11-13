
const products = [
    // Produk tambahan: ganti nama dan gambar sesuai koleksi asli
    {
        nama: "Cardigan Kerah Zipper by dear.daily",
        kategori: "cardigan",
        gambar: "Product11.jpeg"
    },
    {
        nama: "Cardigan Basic Mutiara by dear.daily",
        kategori: "cardigan",
        gambar: "Product12.jpeg"
    },
    {
        nama: "Kemeja Crop Tartan by dear.daily",
        kategori: "shirt",
        gambar: "Product13.jpeg"
    },
    {
        nama: "Cardigan Hoodie by dear.daily",
        kategori: "cardigan",
        gambar: "Product_R1.jpeg"
    },
    {
        nama: "Cardigan Motif Floral by dear.daily",
        kategori: "cardigan",
        gambar: "Product_R2.jpeg"
    },
    {
        nama: "Cardigan Rajut Cable by dear.daily",
        kategori: "cardigan",
        gambar: "Product16.jpeg"
    },
    {
        nama: "Kemeja Crop Lilac by dear.daily",
        kategori: "shirt",
        gambar: "Product17.jpeg"
    },
    {
        nama: "Kemeja Basic Pocket by dear.daily",
        kategori: "shirt",
        gambar: "Product18.jpeg"
    },
    {
        nama: "Cardigan Motif Stripe by dear.daily",
        kategori: "cardigan",
        gambar: "Product_R3.jpeg"
    },
    {
        nama: "Kemeja Lengan Serut by dear.daily",
        kategori: "shirt",
        gambar: "Product20.jpeg"
    },
];


/* =====================================
   PENGATURAN
===================================== */

const nomorWhatsApp = "62895357103298";

const productContainer =
    document.getElementById("productContainer");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const loadMoreBtn =
    document.getElementById("loadMoreBtn");

const productInfo =
    document.getElementById("productInfo");

const produkPerHalaman = 3;

let kategoriAktif = "cardigan";
let jumlahProdukTampil = produkPerHalaman;


/* =====================================
   FILTER DATA PRODUK
===================================== */

function ambilProduk() {
    if (kategoriAktif === "all") {
        return products;
    }

    return products.filter(product =>
        product.kategori === kategoriAktif
    );
}


/* =====================================
   TAMPILKAN PRODUK
===================================== */

function tampilkanProduk() {

    const data = ambilProduk();

    // Hanya mengambil produk sesuai batas tampilan
    const produkTerlihat = data.slice(
        0,
        jumlahProdukTampil
    );

    productContainer.innerHTML = "";

    if (data.length === 0) {
        productContainer.innerHTML = `
            <p>Produk tidak ditemukan.</p>
        `;

        loadMoreBtn.style.display = "none";
        productInfo.textContent = "";
        return;
    }

    produkTerlihat.forEach(product => {

        const card = document.createElement("div");
        card.classList.add("product-card");

        // Gambar produk
        const gambar = document.createElement("img");
        gambar.src = product.gambar;
        gambar.alt = product.nama;
        gambar.classList.add("product-image");
        gambar.loading = "lazy";

        gambar.onerror = function () {
            this.alt = "Gambar belum tersedia: " + product.nama;
        };

        // Informasi produk
        const info = document.createElement("div");
        info.classList.add("product-info");

        const nama = document.createElement("h3");
        nama.textContent = product.nama;

        const kategori = document.createElement("p");
        kategori.classList.add("product-category");
        kategori.textContent =
            product.kategori.charAt(0).toUpperCase() +
            product.kategori.slice(1);



        // Tombol WhatsApp
        const tombolPesan = document.createElement("button");
        tombolPesan.classList.add("btn");
        tombolPesan.textContent = "Pesan Sekarang";

        tombolPesan.addEventListener("click", function () {
            pesanProduk(product);
        });

        info.append(nama, kategori, tombolPesan);
        card.append(gambar, info);

        productContainer.appendChild(card);
    });

    // Informasi jumlah produk
    productInfo.textContent =
        `Menampilkan ${produkTerlihat.length} dari ${data.length} produk`;

    // Atur tombol Lihat Produk Lainnya
    if (jumlahProdukTampil < data.length) {

        loadMoreBtn.style.display = "inline-flex";
        loadMoreBtn.textContent = "Lihat Produk Lainnya";

    } else if (jumlahProdukTampil > produkPerHalaman) {

        loadMoreBtn.style.display = "inline-flex";
        loadMoreBtn.textContent = "Sembunyikan Produk";

    } else {

        loadMoreBtn.style.display = "none";
    }
}


/* =====================================
   TOMBOL LIHAT PRODUK LAINNYA
===================================== */

if (loadMoreBtn) {

    loadMoreBtn.addEventListener("click", function () {

        const data = ambilProduk();

        if (jumlahProdukTampil < data.length) {

            // Tambah 3 produk setiap klik
            jumlahProdukTampil += produkPerHalaman;

            tampilkanProduk();

        } else {

            // Kembali ke 3 produk pertama
            jumlahProdukTampil = produkPerHalaman;

            tampilkanProduk();

            document.getElementById("products")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
        }
    });
}


/* =====================================
   FILTER KATEGORI
===================================== */

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        kategoriAktif = this.dataset.category;

        // Reset tampilan ketika kategori berubah
        jumlahProdukTampil = produkPerHalaman;

        tampilkanProduk();
    });
});


/* =====================================
   PESAN PRODUK WHATSAPP
===================================== */

function pesanProduk(product) {

    const pesan =
        `Halo dear.daily Store,\n\n` +
        `Saya ingin memesan produk:\n` +
        `${product.nama}\n` +
        `Kategori: ${product.kategori}\n` +
        `Apakah produk tersebut masih tersedia?`;

    const url =
        `https://wa.me/${nomorWhatsApp}?text=` +
        encodeURIComponent(pesan);

    window.open(url, "_blank", "noopener");
}


/* =====================================
   MENU NAVIGASI HP
===================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        const aktif = navMenu.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", aktif);
    });

    const navLinks =
        document.querySelectorAll("#navMenu a");

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

tampilkanProduk();