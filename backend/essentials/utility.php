<?php
class Utility
{
    /** @var string Project root path */
    private $root;

    public function __construct()
    {
        // __DIR__ = backend/essentials, go up twice = project root
        $this->root = realpath(dirname(__DIR__, 2)) ?: dirname(__DIR__, 2);
    }

    /**
     * Include a frontend HTML/file by path relative to project root.
     * @param string $path e.g. 'frontend/html/core/head.html'
     */
    public function defineFile($path)
    {
        $file = $this->root . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $path);
        if (is_file($file)) {
            include $file;
        }
    }

    /**
     * Whether the site has been initialized (e.g. setup completed).
     * Override via DB or config as needed.
     * @return bool
     */
    public function checkSiteInitialization()
    {
        // TODO: Check DB/config (e.g. settings table or config file)
        return false;
    }
}
