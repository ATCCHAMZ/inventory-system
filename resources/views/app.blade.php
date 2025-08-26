<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Inventory System</title>
    
    @viteReactRefresh
    @vite('resources/js/app.js') <!-- Keep as .js -->
</head>
<body>
    <div id="app">
        <div style="padding: 20px; text-align: center;">
            <h2>Loading Inventory System...</h2>
            <p>If you see this message for more than a few seconds, check the console for errors.</p>
        </div>
    </div>
    
    <!-- Fallback script for debugging -->
    <script>
        setTimeout(function() {
            var appContent = document.getElementById('app').innerHTML;
            if (appContent.includes('Loading Inventory System')) {
                console.log('React did not mount properly');
                // Add error message
                var errorDiv = document.createElement('div');
                errorDiv.style.cssText = 'position:fixed; top:20px; left:20px; background:red; color:white; padding:20px; z-index:10000;';
                errorDiv.innerHTML = '<h3>React Loading Error</h3><p>Check browser console for details</p>';
                document.body.appendChild(errorDiv);
            }
        }, 3000);
    </script>
</body>
</html>