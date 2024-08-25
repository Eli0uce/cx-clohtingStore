document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".sidebar ul li");
  const card = document.getElementById("card");
  const zoomButton = document.getElementById("zoom-button");
  const headZoomButton = document.getElementById("head-zoom-button");
  const bodyZoomButton = document.getElementById("body-zoom-button");
  const legsZoomButton = document.getElementById("legs-zoom-button");
  const footsZoomButton = document.getElementById("foots-zoom-button");
  const imageGrid = document.getElementById("image-grid");
  const cartSlider = document.getElementById("cart-slider");
  const searchBar = document.getElementById("search-bar");
  const filterButton = document.getElementById("filter-button");
  const filterOptions = document.getElementById("filter-options");
  const modal = document.getElementById("modal");
  const modalCartContent = document.getElementById("modal-cart-content");
  const closeModal = document.querySelector(".modal .close");
  const checkoutButton = document.getElementById("modal-checkout");
  const checkoutCostumeButton = document.getElementById("modal-checkout-tenue");
  let selectedImage = null;
  const totalPriceElement = document.getElementById("total-price");
  const editShop = false;

  const categoryTitles = {
    arms: "Bras",
    tshirt: "T-Shirts",
    torso: "Torses",
    pants: "Pantalons",
    helmet: "Chapeaux",
    mask: "Masques",
    glasses: "Lunettes",
    shoes: "Chaussures",
    bproof: "Gilets",
    bracelets: "Bracelets",
    watches: "Montres",
    bags: "Sacs",
    ears: "Oreilles",
    decals: "Autocollants",
    chain: "Chaînes",
  };

  const customPrices = {
    "img/items/shoes/m/5_.png": 338,
  };

  const itemPrices = {}; // Objet global pour stocker les prix générés

  function getRandomPrice(category, imagePath) {
    // Si le prix existe déjà pour cet article, le retourner
    if (itemPrices.hasOwnProperty(imagePath)) {
      return itemPrices[imagePath];
    }

    if (customPrices.hasOwnProperty(imagePath)) {
      itemPrices[imagePath] = customPrices[imagePath]; // Enregistrer le prix personnalisé
    } else {
      const categoryPrices = {
        arms: [2, 5],
        tshirt: [15, 40],
        torso: [50, 120],
        pants: [20, 50],
        helmet: [25, 50],
        mask: [10, 60],
        glasses: [50, 200],
        shoes: [40, 250],
        bproof: [60, 150],
        bracelets: [20, 100],
        watches: [50, 400],
        bags: [30, 80],
        ears: [15, 70],
        decals: [2, 5],
        chain: [25, 155],
      };
      const [min, max] = categoryPrices[category];
      const randomPrice = Math.floor(Math.random() * (max - min + 1)) + min;
      itemPrices[imagePath] = randomPrice; // Stocker le prix généré
    }

    return itemPrices[imagePath];
  }

  function checkForDuplicateCategories() {
    const cartItems = document.querySelectorAll("#cart-slider .cart-item img");
    const categoryCounts = {};

    cartItems.forEach((item) => {
      const itemSrc = item.src;
      const category = Object.keys(categoryTitles).find((cat) =>
        itemSrc.includes(cat)
      );

      if (category) {
        if (!categoryCounts[category]) {
          categoryCounts[category] = 0;
        }
        categoryCounts[category]++;
      }
    });

    const hasDuplicates = Object.values(categoryCounts).some(
      (count) => count > 1
    );

    const checkoutTenueButton = document.getElementById("modal-checkout-tenue");
    const checkoutButton = document.getElementById("modal-checkout");

    if (hasDuplicates) {
      checkoutTenueButton.style.visibility = "hidden";
      checkoutButton.textContent = "Acheter"; // Update the text of the button
    } else {
      checkoutTenueButton.style.visibility = "visible";
      checkoutButton.textContent = "Acheter séparément";
    }
  }

  // Fonction pour vérifier si une image existe
  function imageExists(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  // Fonction pour générer automatiquement les chemins des images, quel que soit le type de chemin
  async function generateImagePaths(
    category,
    searchQuery = "",
    pathType = "local"
  ) {
    const images = [];
    let sex = "m";
    let index = 0;

    while (true) {
      let imagePath;

      // Générer le chemin de l'image en fonction du type de chemin spécifié
      switch (pathType) {
        case "github":
          imagePath = `https://raw.githubusercontent.com/BI0UBI0U/images-clothingshop/master/${category}/${sex}/${index}_.png`;
          break;
        case "google":
          imagePath = `https://storage.googleapis.com/sst-clotheshop/items/${category}/${sex}/${index}_.png`;
          break;
        case "local":
          imagePath = `./img/items/${category}/${sex}/${index}_.png`;
      }

      // Vérifiez si l'image existe
      if (await imageExists(imagePath)) {
        // Ne garder que les images dont l'index correspond exactement à la requête
        if (searchQuery === "" || index.toString() === searchQuery) {
          images.push(imagePath);
        }
        index++;
      } else {
        break;
      }
    }

    generateImages(images, category);
  }

  // Fonction pour générer les images et les ajouter à la grille
  function generateImages(images, category) {
    imageGrid.innerHTML = ""; // Vide la grille d'images existante
    const columns = [[], [], []]; // Créer trois colonnes vides

    // Créer l'item vide avec l'icône de bannissement
    const emptyItem = document.createElement("div");
    emptyItem.className = "image-wrapper empty-item";
    emptyItem.style.height = "175px";
    emptyItem.style.width = "91%";
    emptyItem.style.position = "relative";
    emptyItem.style.display = "flex";
    emptyItem.style.alignItems = "center";
    emptyItem.style.justifyContent = "center";
    emptyItem.style.background = "rgba(0, 0, 0, 0.05)";
    emptyItem.style.borderRadius = "10px";
    emptyItem.style.padding = "10px";
    // emptyItem.style.boxShadow = "1px 1px 0 0 rgba(150, 150, 150, 0.25)";
    emptyItem.style.transition = "transform 0.3s ease";

    emptyItem.addEventListener("mouseover", () => {
      emptyItem.style.background =
        "linear-gradient(120deg, rgba(0, 0, 0, 0.05) 0%, rgba(213, 126, 235, 0.1) 100%)";
      emptyItem.style.transform = "scale(1.05)";
    });

    emptyItem.addEventListener("mouseout", () => {
      emptyItem.style.background = "rgba(0, 0, 0, 0.05)";
      emptyItem.style.transform = "scale(1)";
    });

    // Ajouter l'icône "ban"
    const banIcon = document.createElement("i");
    banIcon.className = "fa-solid fa-ban";
    banIcon.style.fontSize = "60px";
    banIcon.style.color = "rgba(150, 150, 150, 0.7)";

    emptyItem.appendChild(banIcon);

    // Ajouter l'item vide seulement au début de la première colonne
    columns[0].push(emptyItem);

    images.forEach((image, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "image-wrapper";
      wrapper.style.position = "relative";

      const imgElement = document.createElement("img");
      imgElement.src = image;
      imgElement.alt = `Image ${index + 1}`;

      // Ajuste la taille de l'image en fonction du nombre d'images
      if (images.length === 1) {
        imgElement.style.height = "175px";
        imgElement.style.width = "175px";
        imgElement.style.objectFit = "contain";
      } else {
        imgElement.style.height = "175px";
        imgElement.style.width = "100%";
        imgElement.style.objectFit = "cover";
      }

      imgElement.style.borderRadius = "10px";
      imgElement.style.paddingTop = "10px";
      imgElement.style.paddingBottom = "10px";
      imgElement.style.background = "rgba(0, 0, 0, 0.05)";
      // imgElement.style.boxShadow = "1px 1px 0 0 rgba(150, 150, 150, 0.25)";
      imgElement.style.transition = "transform 0.3s ease";

      const price = getRandomPrice(category, image); // Passer l'image pour vérifier le prix personnalisé
      const overlay = document.createElement("div");
      overlay.className = "overlay";
      overlay.textContent = `${price}$`; // Afficher le prix sur l'image

      // Créer le bouton "Ajouter au panier"
      const cartButton = document.createElement("button");
      cartButton.className = "cart-button";
      cartButton.style.position = "absolute";
      cartButton.style.top = "10px";
      cartButton.style.right = "10px";
      cartButton.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
      cartButton.style.color = "white";
      cartButton.style.border = "none";
      cartButton.style.borderRadius = "20%";
      cartButton.style.paddingTop = "5px";
      cartButton.style.paddingBottom = "5px";
      cartButton.style.cursor = "pointer";
      cartButton.style.zIndex = "10";

      cartButton.innerHTML = `<svg width="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 11L12 15M12 15L16 11M12 15V3M21 11V17.7992C21 18.9193 21 19.4794 20.782 19.9072C20.5903 20.2835 20.2843 20.5895 19.908 20.7812C19.4802 20.9992 18.9201 20.9992 17.8 20.9992H6.2C5.0799 20.9992 4.51984 20.9992 4.09202 20.7812C3.71569 20.5895 3.40973 20.2835 3.21799 19.9072C3 19.4794 3 18.9193 3 17.7992V11" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;

      cartButton.addEventListener("click", (event) => {
        event.stopPropagation();
        addToCart(image, price, category);
      });

      // Créer le bouton "Ajouter aux favoris"
      const favButton = document.createElement("button");
      favButton.className = "fav-button";
      favButton.style.position = "absolute";
      favButton.style.top = "42px";
      favButton.style.right = "13px";
      favButton.style.backgroundColor = "rgba(0, 0, 0, 0)";
      favButton.style.color = "white";
      favButton.style.border = "none";
      favButton.style.borderRadius = "20%";
      favButton.style.cursor = "pointer";
      favButton.style.zIndex = "10";

      // Ajouter l'icône à l'intérieur du bouton
      favButton.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;

      // Ajouter un écouteur d'événements pour le survol de la souris
      favButton.addEventListener("mouseover", function () {
        favButton.style.color = "#758bb2";
      });

      favButton.addEventListener("mouseout", function () {
        favButton.style.color = "white";
      });

      favButton.addEventListener("click", (event) => {
        event.stopPropagation();
        addToFavorites(image, price, category);
      });

      wrapper.appendChild(imgElement);
      wrapper.appendChild(overlay);
      wrapper.appendChild(cartButton);
      wrapper.appendChild(favButton); // Ajouter le bouton des favoris

      imgElement.addEventListener("mouseover", () => {
        imgElement.style.background =
          "linear-gradient(120deg, rgba(0, 0, 0, 0.05) 0%, rgba(213, 126, 235, 0.1) 100%)";
        imgElement.style.transform = "scale(1.05)";
      });

      imgElement.addEventListener("mouseout", () => {
        imgElement.style.background = "rgba(0, 0, 0, 0.05)";
        imgElement.style.transform = "scale(1)";
      });

      columns[index % 3].push(wrapper);
    });

    // Ajuste le nombre de colonnes en fonction du nombre d'images
    columns.forEach((column, i) => {
      if (images.length <= 2 && i >= images.length) {
        return; // Ignore les colonnes vides si le nombre d'images est faible
      }
      const columnDiv = document.createElement("div");
      columnDiv.className = "column";
      column.forEach((wrapper) => columnDiv.appendChild(wrapper));
      imageGrid.appendChild(columnDiv);
    });

    const scrollableContent = document.querySelector(".scrollable-content");
    if (scrollableContent) {
      scrollableContent.scrollTop = 0;
    }
  }

  // Fonction pour ajouter un article aux favoris
  function addToFavorites(itemSrc, price, category) {
    // Ici, vous pouvez implémenter la logique pour gérer les favoris
    console.log(`Ajouté aux favoris : ${itemSrc} - Prix : ${price}$`);
  }

  // Ajoute un écouteur à la barre de recherche
  searchBar.addEventListener("input", (event) => {
    const searchQuery = event.target.value;
    const activeItem = document.querySelector(".sidebar ul li.active");
    if (activeItem) {
      const category = activeItem.id;
      generateImagePaths(category, searchQuery);
    }
  });

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.id;
      generateImagePaths(id);

      card.style.display = "block";
      card.style.animation = "slideInX 0.5s ease-out";
      card.classList.remove("hide");
      card.classList.add("show");

      // Attendre que l'animation de la carte soit terminée
      card.addEventListener(
        "animationend",
        () => {
          zoomButton.style.display = "block";
          zoomButton.style.opacity = 0;
          zoomButton.style.transition = "opacity 0.3s ease-in";
          setTimeout(() => {
            zoomButton.style.opacity = 1;
          }, 10); // Légère attente pour que la transition s'applique correctement
        },
        { once: true }
      ); // `once: true` assure que cet événement ne soit écouté qu'une fois

      items.forEach((li) => li.classList.remove("active"));
      item.classList.add("active");

      selectedImage = item.querySelector("img").src;
    });
  });

  filterButton.addEventListener("click", () => {
    filterOptions.style.display =
      filterOptions.style.display === "block" ? "none" : "block";
  });

  zoomButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const toggleFade = (element) => {
      if (element.style.display === "block") {
        element.style.opacity = 0;
        setTimeout(() => {
          element.style.display = "none";
        }, 500); // Attendre que l'opacité soit à 0 avant de masquer l'élément
      } else {
        element.style.display = "block";
        element.style.opacity = 0;
        setTimeout(() => {
          element.style.transition = "opacity 0.3s ease-in";
          element.style.opacity = 1;
        }, 10); // Légère attente pour que la transition s'applique correctement
      }
    };

    toggleFade(headZoomButton);
    toggleFade(bodyZoomButton);
    toggleFade(legsZoomButton);
    toggleFade(footsZoomButton);
  });

  // Apply the filter based on the selected price range
  const applyFilterButton = document.getElementById("apply-filter");
  const removeFiltersButton = document.getElementById("remove-filter");

  applyFilterButton.addEventListener("click", () => {
    const minPrice = parseInt(document.getElementById("min-price").value, 10);
    const maxPrice = parseInt(document.getElementById("max-price").value, 10);

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      filterImagesByPrice(minPrice, maxPrice);
    }
  });

  removeFiltersButton.addEventListener("click", () => {
    // Clear the price inputs
    document.getElementById("min-price").value = "";
    document.getElementById("max-price").value = "";

    // Show all images by removing any filters
    const images = document.querySelectorAll(".image-wrapper");
    images.forEach((image) => {
      image.style.display = "block"; // Display all images
    });
  });

  function filterImagesByPrice(minPrice, maxPrice) {
    const imageGrid = document.getElementById("image-grid");
    const images = imageGrid.querySelectorAll(".image-wrapper");

    images.forEach((wrapper) => {
      const price = parseInt(wrapper.querySelector(".overlay").textContent, 10);

      if (price >= minPrice && price <= maxPrice) {
        wrapper.style.display = "block";
      } else {
        wrapper.style.display = "none";
      }
    });
  }

  function addToCart(itemSrc, price) {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.innerHTML = "x";

    removeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      cartSlider.removeChild(cartItem);
      updateTotalPrice();
      checkForDuplicateCategories();
      logCart();
    });

    cartItem.innerHTML = `<img src="${itemSrc}" alt="Cart Item" /><span class="cart-item-price">${price}$</span>`;
    cartItem.appendChild(removeButton);

    cartSlider.appendChild(cartItem);
    updateTotalPrice();
    checkForDuplicateCategories();
    logCart();
  }

  function updateTotalPrice() {
    const itemElements = cartSlider.querySelectorAll(".cart-item");
    let totalPrice = 0;
    itemElements.forEach((item) => {
      const price = parseFloat(item.querySelector("span").textContent);
      totalPrice += price;
    });
    totalPriceElement.textContent = `${totalPrice}$`;
  }

  function logCart() {
    const items = cartSlider.querySelectorAll(".cart-item");
    const itemSources = Array.from(items).map(
      (item) => item.querySelector("img").src
    );
    console.log("Panier actuel:", itemSources);
  }

  function openModal() {
    modalCartContent.innerHTML = "";

    const items = cartSlider.querySelectorAll(".cart-item");
    items.forEach((item) => {
      const cartItemClone = item.cloneNode(true);

      const removeButton = cartItemClone.querySelector(".remove-button");
      if (removeButton) {
        cartItemClone.removeChild(removeButton);
      }

      modalCartContent.appendChild(cartItemClone);
    });

    const modalTotalPriceElement = document.getElementById("modal-total-price");
    modalTotalPriceElement.textContent = `: ${totalPriceElement.textContent}`;

    modal.style.display = "block";
    card.style.display = "none";
    zoomButton.style.display = "none";
  }

  function clearCart() {
    const cartItems = cartSlider.querySelectorAll(".cart-item");

    cartItems.forEach((item, index) => {
      // Apply the fade-out class
      item.classList.add("fade-out");

      // Remove the item after the animation ends
      setTimeout(() => {
        cartSlider.removeChild(item);

        // If this is the last item, update total price and other UI elements
        if (index === cartItems.length - 1) {
          updateTotalPrice();
          checkForDuplicateCategories();
          logCart();
        }
      }, 500); // Timeout duration should match the animation duration
    });
  }

  // Ajouter un événement pour le bouton d'achat
  document.getElementById("btn-buy").addEventListener("click", openModal);
  // Event listener for the "Cancel" button
  document.getElementById("btn-cancel").addEventListener("click", clearCart);

  // Ajouter un événement pour fermer la modal
  closeModal.addEventListener("click", (event) => {
    event.stopPropagation(); // Empêche la propagation du clic
    modal.style.display = "none";
    card.style.display = "block";
    zoomButton.style.display = "block";
  });

  // Ajouter un événement pour fermer la modal en cliquant en dehors
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      zoomButton.style.display = "none";
    }
  });

  // Gestion de l'achat d'items individuels
  checkoutButton.addEventListener("click", () => {
    logCart();
    itemBuy.forEach((itemInfo) => {
      let clothes = {
        name: itemInfo.name,
        price: itemInfo.price,
        drawable: itemInfo.drawable,
        type: itemInfo.type,
        img: itemInfo.img,
      };

      // Fonction d'envoi des données pour un item unique
      EnvoieGunware(clothes);
    });
    modal.style.display = "none"; // Fermer la modal après l'achat
    cartSlider.innerHTML = ""; // Vider le panier
  });

  // Gestion de l'achat d'une tenue complète
  checkoutCostumeButton.addEventListener("click", () => {
    let skin = [];
    itemSkinBuy.forEach((itemSkinInfo) => {
      let skinInfos = {
        name: itemSkinInfo.name,
        price: itemSkinInfo.price,
        drawable: itemSkinInfo.drawable,
        type: itemSkinInfo.type,
        img: itemSkinInfo.img,
      };
      skin.push(skinInfos);
    });

    // Fonction d'envoi des données pour une tenue complète
    EnvoieGunwareTenue(skin);
    modal.style.display = "none"; // Fermer la modal après l'achat
    cartSlider.innerHTML = ""; // Vider le panier
  });

  document.addEventListener("DOMContentLoaded", function () {
    const sidebarItems = document.querySelectorAll(".sidebar li");

    sidebarItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Enlève la classe 'active' de tous les éléments
        sidebarItems.forEach((el) => el.classList.remove("active"));

        // Ajoute la classe 'active' à l'élément cliqué
        this.classList.add("active");
      });
    });
  });

  // Ajoutez l'écouteur pour fermer la carte lorsque l'on clique à l'extérieur
  document.addEventListener("click", (event) => {
    const isClickInsideSidebar = event.target.closest(".sidebar");
    const isClickInsideCard = event.target.closest(".card");

    if (!isClickInsideSidebar && !isClickInsideCard) {
      card.classList.remove("show");
      card.classList.add("hide");

      items.forEach((li) => li.classList.remove("active"));

      setTimeout(() => {
        card.style.display = "none";
        zoomButton.style.display = "none";
        headZoomButton.style.display = "none";
        bodyZoomButton.style.display = "none";
        legsZoomButton.style.display = "none";
        footsZoomButton.style.display = "none";
      });
    }
  });
});

window.addEventListener("load", (event) => {
  const container = document.querySelector("body");

  window.addEventListener("message", (event) => {
    let data = event.data;
    if (data.action === "open") {
      container.style.visibility = "visible";
    } else if (data.action === "close") {
      container.style.visibility = "hidden";
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      fetch("http://shopui-test/closeall");
    }
  });
});
