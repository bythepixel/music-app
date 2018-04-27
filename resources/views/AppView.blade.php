<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
	<title>Music App</title>
	<meta name="description" content="Music App">

	<link rel="stylesheet" href="https://use.typekit.net/ufb3jbs.css">
	<link rel="stylesheet" href="{{ mix('/css/app.css') }}">
	<script type="text/javascript" src="{{ mix('/js/app.js') }}" async></script>
</head>

<body data-access-token="{{ $accessToken }}" data-access-token-expiration="{{ $accessTokenExpiration }}">
	<h1>Hello, World!</h1>
	<div id="app"></div>
</body>

</html>