import uvicorn
from fastapi import FastAPI

from routers.applicanthelps import applicantHelpRouter
from routers.users import userRouter
from routers.authentification import TokenRouter
from routers.offers import offreRouter

app = FastAPI(debug=True)

app.include_router(userRouter)
app.include_router(TokenRouter)
app.include_router(offreRouter)
app.include_router(applicantHelpRouter)
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

# Press the green button in the gutter to run the script.

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
