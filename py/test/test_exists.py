# Waifuim SDK exists test

import pytest
from waifuim_sdk import WaifuimSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = WaifuimSDK.test(None, None)
        assert testsdk is not None
