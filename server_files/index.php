<pre>
<?php

# Get the directory portion of the url, e.g. "/s/" or "/s/2020/"
$dir_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

# Remove all redundant slashes
$dir_path = preg_replace('#/+#', '/', $dir_path);

# Construct base of all urls
#$url_base = 'https://' . $_SERVER['SERVER_NAME'] . $dir_path;
# Get local filesystem path for requested directory
$path = $_SERVER['DOCUMENT_ROOT'] . $dir_path;

if(!is_dir($path)){
    exit;
}

$d = new DirectoryIterator($path);

foreach ($d as $f) {
    if (
        $f->isFile() &&
        preg_match('/(\.gif|\.png|\.jpe?g)$/', strtolower($f->getFilename()))
    ) {
        list($w, $h) = getimagesize($f->getPathname());

        // echo $url_base . $f->getFilename() . ' Dimensions: ' . $w . ' ' . $h . "\n";
        echo '{% include figure image_path="' . substr($f->getPathname(), strlen(getcwd())+1) .'" caption="" alt="" class="" max_width=' . $w . ' max_height=' . $h . '%}' . "\n";
    }
}
?>
</pre>