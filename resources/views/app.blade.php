<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Zucandu Scheduler</title>
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
</head>
<body class="toggle-sidebar">
    <div id="scheduler-app"></div>
</body>
</html>
<script src="{{ mix('js/app.js') }}"></script>