# Cohort Manager - Routing Configuration

This document provides instructions for configuring routing support for the Vue.js frontend in the Cohort Manager plugin.

## Overview

The Cohort Manager plugin uses Vue Router for client-side routing. To ensure that all routes work properly, you need to configure your web server (Apache or Nginx) to handle Vue Router routes by falling back to the main PHP file when a route doesn't correspond to a physical file.

## Prerequisites

- Vue Router is configured with base path `/local/cohortmanager/`
- The application uses HTML5 History mode
- Static assets are served from the same directory structure

## Nginx Configuration

Add the following location block to your Nginx server configuration:

```nginx
# Handle Vue Router for cohortmanager
location /local/cohortmanager/ {
    try_files $uri $uri/ /local/cohortmanager/index.php?$query_string;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# Handle PHP requests for cohortmanager
location /local/cohortmanager/index.php {
    fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;  # Adjust path as needed
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include fastcgi_params;
}
```

### Configuration Notes

- The `try_files` directive ensures that non-existent routes fall back to `index.php`
- Static assets are cached for 1 year to improve performance
- Adjust the `fastcgi_pass` path to match your PHP-FPM socket configuration

## Apache Configuration

The plugin includes a pre-configured `.htaccess` file at the root directory (`local/cohortmanager/.htaccess`). This file provides the necessary routing configuration for Apache.

### Manual Configuration (if needed)

If you need to configure Apache manually, add the following to your Apache configuration or `.htaccess` file:

```apache
# Handle Vue Router for cohortmanager
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # If the requested file or directory exists, serve it directly
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]
    
    # Otherwise, redirect to index.php to let Vue Router handle it
    RewriteRule ^(.*)$ index.php?$1 [L,QSA]
</IfModule>

# Handle static assets caching
<IfModule mod_expires.c>
    ExpiresActive On
    
    # Cache static assets for 1 year
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/ico "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresByType font/ttf "access plus 1 year"
    ExpiresByType font/eot "access plus 1 year"
</IfModule>

# Add cache control headers for static assets
<IfModule mod_headers.c>
    <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
        Header set Cache-Control "public, immutable"
    </FilesMatch>
</IfModule>
```

## Available Routes

The application supports the following routes:

- `/local/cohortmanager/` - Cohort List (main page)
- `/local/cohortmanager/cohort/{id}` - Cohort Details
- `/local/cohortmanager/cohort/{id}/edit` - Edit Cohort
- `/local/cohortmanager/cohort/create` - Create New Cohort
- `/local/cohortmanager/custom-fields` - Custom Fields Management

## Troubleshooting

### Common Issues

1. **404 Errors on Vue Routes**
   - Ensure the server configuration is properly applied
   - Check that the `try_files` (Nginx) or `RewriteRule` (Apache) is correctly configured
   - Verify that the base path matches the Vue Router configuration

2. **Static Assets Not Loading**
   - Check file permissions
   - Verify that the static asset paths are correct
   - Ensure caching headers are not causing issues in development

3. **PHP-FPM Connection Issues (Nginx)**
   - Verify the PHP-FPM socket path is correct
   - Check PHP-FPM service status
   - Ensure proper permissions on the socket file

### Testing Configuration

After applying the configuration, test the following:

1. Access the main page: `/local/cohortmanager/`
2. Navigate to a cohort detail: `/local/cohortmanager/cohort/1`
3. Test creating a new cohort: `/local/cohortmanager/cohort/create`
4. Verify static assets load correctly (check browser dev tools)

## Additional Notes

- The configuration assumes the plugin is installed in the standard Moodle directory structure
- Adjust paths if your Moodle installation is in a non-standard location
- Development environments may need different caching settings
- Always test configuration changes in a development environment before applying to production