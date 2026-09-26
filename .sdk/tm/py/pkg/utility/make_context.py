# Waifuim SDK utility: make_context

from projectname_sdk.core.context import WaifuimContext


def make_context_util(ctxmap, basectx):
    return WaifuimContext(ctxmap, basectx)
