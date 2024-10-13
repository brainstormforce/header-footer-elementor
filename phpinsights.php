<?php

declare(strict_types=1);

return [

    'preset' => 'default',

    'add' => [
        // You can add custom insights here if needed.
    ],

    'remove' => [
        // Disable any insights you don't want to run.
    ],

   'config' => [
       \PHP_CodeSniffer\Standards\Generic\Sniffs\Files\LineLengthSniff::class => [
           'lineLimit' => 120,
           'absoluteLineLimit' => 160,
       ],
   ],

    'exclude' => [
        'vendor/',
        'node_modules/',
        'tests',
        '*/vendor/',
        'vendor/symfony/cache/',
    ],

    'requirements' => [
        // Add performance metrics, PHP version requirements, etc.
    ],

];
