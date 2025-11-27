document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute("href").substring(1);
            const section = document.getElementById(sectionId);

            window.scrollTo({
                top: section.offsetTop - document.querySelector('header').offsetHeight,
                behavior: "smooth"
            });
        });
    });
    
                                      
    // Function to highlight searched item
    function highlightItem(itemName) {
        const items = document.querySelectorAll(".product-item");
        items.forEach(item => {
            if (item.dataset.name.toLowerCase().includes(itemName.toLowerCase())) {
                item.classList.add("highlight");
                setTimeout(() => {
                    item.classList.remove("highlight");
                }, 3000); // Highlight for 3 seconds
                // Scroll to the searched item
                item.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Adding click event listener to search button
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", function() {
        const searchText = document.getElementById("searchInput").value.trim();
        if (searchText !== "") {
            // Highlight and scroll to searched item
            highlightItem(searchText);
        }
    });

    // Function to toggle visibility of category sections
    function toggleCategorySection(categoryId) {
        // Hide all category sections
        const categorySections = document.querySelectorAll(".category-section");
        categorySections.forEach(section => {
            section.style.display = "none";
        });
        // Show the selected category section
        const selectedSection = document.getElementById(categoryId);
        if (selectedSection) {
            selectedSection.style.display = "block";
            // Scroll to the selected category section
            selectedSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Adding click event listeners to view more links
    const viewMoreLinks = document.querySelectorAll(".view-more");
    viewMoreLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const categoryId = this.getAttribute("href").substring(1);
            toggleCategorySection(categoryId);
        });
    });
    // Get the contact form
    const contactForm = document.getElementById("contactForm");

    // Adding event listener for form submission
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get form data
         const formData = new FormData(contactForm);
         const name = formData.get("name");
         const email = formData.get("email");
         const message = formData.get("message");

        
        // display a thank you message
        displayThankYouMessage();
    });

    // Function to display thank you message
    function displayThankYouMessage() {
        const thankYouMessage = document.createElement("p");
        thankYouMessage.textContent = "Thank you for your message! We'll get back to you soon.";
        thankYouMessage.classList.add("thank-you-message");

        const contactContent = document.querySelector(".contact-content");
        contactContent.appendChild(thankYouMessage);

       
        contactForm.reset();

        // Remove the thank you message after 5 seconds
        setTimeout(function() {
            thankYouMessage.remove();
        }, 5000);
    }
    
    // pre and next 
    let currentIndex = 0;
    const testimonials = document.querySelectorAll(".testimonial");
    const totalTestimonials = testimonials.length;

    document.querySelector(".next").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        updateSlider();
    });

    document.querySelector(".prev").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
        updateSlider();
    });

    function updateSlider() {
        const slider = document.querySelector(".testimonial-slider");
        const width = testimonials[0].clientWidth;
        slider.style.transform = `translateX(-${currentIndex * width}px)`;
    }

    // Handle newsletter form submission
    const newsletterForm = document.getElementById("newsletterForm");
    newsletterForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("newsletterEmail").value;
        alert(`Thank you for subscribing, ${email}!`);
        newsletterForm.reset();
    });
    const closeButtons = document.querySelectorAll(".close-btn");

    closeButtons.forEach(button => {
        button.addEventListener("click", function() {
            const promotionCard = this.parentElement;
            promotionCard.style.display = "none";
        });
    });
    // cart functionality
    const cart = [];
    const modal = document.getElementById('cartModal');
    const orderModal = document.getElementById('orderModal');
    const receiptModal = document.getElementById('receiptModal');
    const modalProductTitle = document.getElementById('modalProductTitle');
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalAddToCart = document.getElementById('modalAddToCart');
    const modalOrderNow = document.getElementById('modalOrderNow');
    const closeModalElements = document.querySelectorAll('.modal .close');
    const orderForm = document.getElementById('orderForm');
    const receiptContent = document.getElementById('receiptContent');
    const closeReceipt = document.getElementById('closeReceipt');
    let currentProduct = {};


    // Event listener for Add to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            const productElement = event.target.closest('.product-item');
            const productName = productElement.querySelector('h3').textContent;
            const productPrice = productElement.querySelector('.price').textContent;
            const productImage = productElement.querySelector('img').src;
            
            modalProductTitle.textContent = productName;
            modalProductPrice.textContent = productPrice;
            modalProductImage.src = productImage;
             
            currentProduct = {
                name: productName,
                price: productPrice,
                image: productImage
            };

            modal.style.display = 'block';
            
        });
    });

    modalAddToCart.onclick = () => {
        cart.push(currentProduct)
        console.log(cart);
        alert(`${currentProduct.name} has been added to the cart.`);
        modal.style.display = 'none';
    };

    modalOrderNow.onclick = () => {
        modal.style.display = 'none';
        orderModal.style.display = 'block';
    };

    closeModalElements.forEach(closeElement => {
        closeElement.onclick = () => {
            closeElement.closest('.modal').style.display = 'none';
        };
    });

    window.onclick = event => {
        if (event.target == modal) {
            modal.style.display = 'none';
        } else if (event.target == orderModal) {
            orderModal.style.display = 'none';
        } else if (event.target == receiptModal) {
            receiptModal.style.display = 'none';
        }
    };

    orderForm.onsubmit = (event) => {
        event.preventDefault();
        
        const name = document.getElementById('orderName').value;
        const phone = document.getElementById('orderPhone').value;
        const email = document.getElementById('orderEmail').value;
        const address = document.getElementById('orderAddress').value;
        const quantity = parseInt(document.getElementById('orderQuantity').value);

        const totalPrice = parseFloat(currentProduct.price.replace('₹', '')) * quantity;

        receiptContent.innerHTML = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Product:</strong> ${currentProduct.name}</p>
            <p><strong>Price:</strong> ${currentProduct.price}</p>
            <p><strong>Quantity Sold:</strong> ${quantity}</p>
            <p><strong>Total Price:</strong> ₹${totalPrice.toFixed(2)}</p>
        `;

        orderModal.style.display = 'none';
        receiptModal.style.display = 'block';
        orderForm.reset();
    };

    closeReceipt.onclick = () => {
        receiptModal.style.display = 'none';
    };
    
});
    



