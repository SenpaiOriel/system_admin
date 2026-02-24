<?php
class db_handler
{
    /** @var Utility */
    private $utility;

    /** @var PDO|null */
    private $pdo;

    public function __construct(Utility $utility)
    {
        $this->utility = $utility;
    }

    /**
     * Check if DB connection is already established.
     * @return bool
     */
    public function checkDBConnection()
    {
        return $this->pdo !== null;
    }

    /**
     * Establish DB connection. Configure credentials as needed.
     */
    public function dbConnect()
    {
        // TODO: Load from config (e.g. env or config file)
        $host = 'localhost';
        $dbname = 'cvaltis';
        $user = 'root';
        $pass = '';
        $dsn = "mysql:host={$host};dbname={$dbname};charset=utf8mb4";
        try {
            $this->pdo = new PDO($dsn, $user, $pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            ]);
        } catch (PDOException $e) {
            // Log or handle; leave $this->pdo null
        }
    }
}
