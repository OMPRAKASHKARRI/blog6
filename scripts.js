// Blog functionality
function showBlogForm() {
    document.getElementById('blog-form').classList.remove('hidden');
    document.getElementById('blogs-container').style.opacity = '0.5';
}

function hideBlogForm() {
    document.getElementById('blog-form').classList.add('hidden');
    document.getElementById('blogs-container').style.opacity = '1';
}

function handleBlogSubmit(event) {
    event.preventDefault();
    
    const blog = {
        id: Date.now().toString(),
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
        image: document.getElementById('image').value || 'https://source.unsplash.com/800x600/?travel',
        date: new Date().toISOString()
    };

    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    blogs.push(blog);
    localStorage.setItem('blogs', JSON.stringify(blogs));

    event.target.reset();
    hideBlogForm();
    loadBlogs();
}

function loadBlogs() {
    const blogsContainer = document.getElementById('blogs-container');
    if (!blogsContainer) return;

    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    
    blogsContainer.innerHTML = blogs.map(blog => `
        <div class="feature-card">
            <img src="${blog.image}" alt="${blog.title}">
            <div class="card-content">
                <h2>${blog.title}</h2>
                <p>${blog.content.substring(0, 150)}...</p>
                <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
                    <span>${new Date(blog.date).toLocaleDateString()}</span>
                    <button onclick="deleteBlog('${blog.id}')" class="delete-btn btn-danger">Delete</button>
                    <button onclick="editBlog('${blog.id}')" class="create-btn">Edit</button>
                </div>
            </div>
        </div>
    `).join('');
}
function deleteBlog(id) {
    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    loadBlogs();
}

function editBlog(id) {
    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    const blog = blogs.find(b => b.id === id);
    if (!blog) return;

    document.getElementById('title').value = blog.title;
    document.getElementById('content').value = blog.content;
    document.getElementById('image').value = blog.image;

    const form = document.getElementById('createBlogForm');
    form.onsubmit = (e) => {
        e.preventDefault();
        
        const updatedBlog = {
            ...blog,
            title: document.getElementById('title').value,
            content: document.getElementById('content').value,
            image: document.getElementById('image').value,
        };

        const updatedBlogs = blogs.map(b => b.id === id ? updatedBlog : b);
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

        form.reset();
        hideBlogForm();
        loadBlogs();
        form.onsubmit = handleBlogSubmit;
    };

    showBlogForm();
}

// Modal functionality
function showModal(contentType) {
    const modal = document.getElementById('contentModal');
    const modalContent = document.getElementById('modalContent');
    const title = document.getElementById('modalTitle');
    
    let content = '';
    
    switch(contentType) {
        case 'destinations':
            title.textContent = 'Featured Destinations';
            content = `
                <div class="modal-grid">
                    <div class="modal-item">
                        <img src="greece.jpeg" alt="Santorini">
                        <h3>Santorini, Greece</h3>
                        <p>Experience the stunning white-washed buildings, blue-domed churches, and breathtaking sunsets of this Mediterranean paradise.</p>
                        <ul>
                            <li>Best time to visit: April to October</li>
                            <li>Known for: Spectacular sunsets, white architecture</li>
                            <li>Must-do: Watch sunset in Oia, visit black sand beaches</li>
                        </ul>
                    </div>
                    <div class="modal-item">
                        <img src="bali.jpeg" alt="Bali">
                        <h3>Bali, Indonesia</h3>
                        <p>Discover the perfect blend of spiritual tranquility and tropical beauty in this Indonesian paradise.</p>
                        <ul>
                            <li>Best time to visit: April to October</li>
                            <li>Known for: Temples, rice terraces, beaches</li>
                            <li>Must-do: Visit Ubud temples, explore rice fields</li>
                        </ul>
                    </div>
                    <div class="modal-item">
                        <img src="kyoto.jpeg" alt="Kyoto">
                        <h3>Kyoto, Japan</h3>
                        <p>Step back in time in Japan's cultural heart, where ancient temples meet modern Japanese culture.</p>
                        <ul>
                            <li>Best time to visit: March-May, October-November</li>
                            <li>Known for: Traditional temples, gardens</li>
                            <li>Must-do: Visit Fushimi Inari Shrine, experience tea ceremony</li>
                        </ul>
                    </div>
                </div>
            `;
            break;
        case 'tips':
            title.textContent = 'Travel Tips';
            content = `
                <div class="tips-container">
                    <div class="tip-section">
                        <h3>Planning Your Trip</h3>
                        <ul>
                            <li>Book flights 3-6 months in advance for best deals</li>
                            <li>Research local customs and etiquette</li>
                            <li>Get travel insurance for peace of mind</li>
                            <li>Make copies of important documents</li>
                        </ul>
                    </div>
                    <div class="tip-section">
                        <h3>Packing Essentials</h3>
                        <ul>
                            <li>Universal power adapter</li>
                            <li>Comfortable walking shoes</li>
                            <li>First-aid kit</li>
                            <li>Portable charger</li>
                        </ul>
                    </div>
                    <div class="tip-section">
                        <h3>Money-Saving Tips</h3>
                        <ul>
                            <li>Use local transportation</li>
                            <li>Eat where locals eat</li>
                            <li>Visit free attractions</li>
                            <li>Travel during off-peak seasons</li>
                        </ul>
                    </div>
                    <div class="tip-section">
                        <h3>Safety Tips</h3>
                        <ul>
                            <li>Keep emergency contacts handy</li>
                            <li>Research safe neighborhoods</li>
                            <li>Be aware of common scams</li>
                            <li>Keep valuables secure</li>
                        </ul>
                    </div>
                </div>
            `;
            break;
        case 'community':
            title.textContent = 'Travel Community';
            content = `
                <div class="community-container">
                    <div class="community-section">
                        <h3>Join Our Community</h3>
                        <p>Connect with fellow travelers, share experiences, and get inspired for your next adventure!</p>
                        <div class="community-features">
                            <div class="feature">
                                <h4>Travel Forums</h4>
                                <p>Join discussions about destinations, travel tips, and experiences.</p>
                                <button class="join-btn">Join Discussion</button>
                            </div>
                            <div class="feature">
                                <h4>Travel Buddies</h4>
                                <p>Find travel companions for your next adventure.</p>
                                <button class="join-btn">Find Buddies</button>
                            </div>
                            <div class="feature">
                                <h4>Local Meetups</h4>
                                <p>Meet travelers in your city or destination.</p>
                                <button class="join-btn">Find Meetups</button>
                            </div>
                        </div>
                    </div>
                    <div class="community-stats">
                        <div class="stat">
                            <h4>10,000+</h4>
                            <p>Active Members</p>
                        </div>
                        <div class="stat">
                            <h4>150+</h4>
                            <p>Countries</p>
                        </div>
                        <div class="stat">
                            <h4>5,000+</h4>
                            <p>Monthly Meetups</p>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
    
    modalContent.innerHTML = content;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('contentModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('contentModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Auth functionality
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (isLoggedIn()) { 
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('logoutLink').style.display = 'block';
      }
    
    // Simple login simulation
    alert(`Login attempted with email: ${email}`);
    window.location.href = 'index.html';
}
function handleLogout() {
    // ... Your logout logic (e.g., clear local storage) ...
    localStorage.removeItem('isLoggedIn');
  
    // Update UI: show login link and hide logout link
    document.getElementById('loginLink').style.display = 'block';
    document.getElementById('logoutLink').style.display = 'none';
  
    // Redirect to homepage or any other relevant page
    window.location.href = 'index.html'; 
  }
  
  function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  
  // Attach event listener to logout link
  document.getElementById('logoutLink').addEventListener('click', handleLogout);
  
  // Check if the user is already logged in on page load
  if (isLoggedIn()) {
    document.getElementById('loginLink').style.display = 'none';
    document.getElementById('logoutLink').style.display = 'block'; 
  }
function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Simple signup simulation
    alert(`Account created for ${name} (${email})`);
    window.location.href = 'login.html';
}

// Initialize blogs on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('blogs-container')) {
        loadBlogs();
    }
});