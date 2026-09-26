<?php
declare(strict_types=1);

// Waifuim SDK base feature

class WaifuimBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(WaifuimContext $ctx, array $options): void {}
    public function PostConstruct(WaifuimContext $ctx): void {}
    public function PostConstructEntity(WaifuimContext $ctx): void {}
    public function SetData(WaifuimContext $ctx): void {}
    public function GetData(WaifuimContext $ctx): void {}
    public function GetMatch(WaifuimContext $ctx): void {}
    public function SetMatch(WaifuimContext $ctx): void {}
    public function PrePoint(WaifuimContext $ctx): void {}
    public function PreSpec(WaifuimContext $ctx): void {}
    public function PreRequest(WaifuimContext $ctx): void {}
    public function PreResponse(WaifuimContext $ctx): void {}
    public function PreResult(WaifuimContext $ctx): void {}
    public function PreDone(WaifuimContext $ctx): void {}
    public function PreUnexpected(WaifuimContext $ctx): void {}
}
