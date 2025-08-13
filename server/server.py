from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from example_dal import get_example, post_example, patch_example, delete_example
from progress_hook import progress

app = FastAPI()
port = 5694

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

####################################################################
# ====================== EXAMPLE COMMANDS ======================== #
####################################################################


@app.get("/example")
async def __get_example():
    return get_example()


@app.post("/example")
async def __post_example():
    return post_example()


@app.patch("/example")
async def __patch_example():
    return patch_example()


@app.delete("/example")
async def __delete_example():
    return delete_example()


####################################################################
# ========================= PROGRESS HOOK ======================== #
####################################################################


@app.get("/progress")
async def __progress():
    """
    Poll-able endpoint for the client to track progress.
    Response shape depends on current phase.
    """
    return progress()


####################################################################
# ============================= MAIN ============================= #
####################################################################

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=port)
