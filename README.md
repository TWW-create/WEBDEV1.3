lint with
```sh
./vendor/bin/pint -v
```

-git clone --single-branch --branch master https://github.com/GoodnewsPerfect/bara.git
-git clone --single-branch --branch BAW-3-backend https://github.com/TWW-create/baraweb.git

-Copy the example environment file to create your own .env file in the project folder: cp .env.example .env 

-composer install

-php artisan key:generate

-- php artisan jwt:secret

-- php artisan migrate --seed

-- php artisan serve
-- php artisan storage:link

//for DB reloading--
```sh
php artisan migrate:fresh --seed
```

//trobleshoot app--
```sh
php artisan optimize
```

----- file upload limit 40mb

// to increase file upload limit
In your PHP.ini file, increase these values:
```sh
upload_max_filesize = 10M
post_max_size = 10M
```

// In your Laravel application, you can also adjust the validation rule in BannerController.php:
```sh
'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240', // Allows up to 10MB
```

// create model and migration
```sh
php artisan make:model Blog -m
```

```sh

```

```sh

```

//issues
banner update not working
blog update not working