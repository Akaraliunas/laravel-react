## Laravel + React.js wishlist app

Application consists of:
- User login and registration part.
- Only registered users can wishlist products.
- Displaying products with the option to add to the wishlist.
- Showing all wishlisted products for particular logged in user.

Install projct dependancies: 
- composer install
- npm install

Launch project:
- php artisan migrate
- php artisan db:seed --class=ProductsTableSeeder
- php artisan serve
- **npm run dev** or **npm run build**
