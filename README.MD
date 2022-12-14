# Image Generator
Image Generator is an api that utilizes the openAI model to create and edit images


## End points
#### Create Image
```
http://localhost:5000/image/create-image
```
###### request:
```
fetch("http://localhost:5000/image/create",{
    method:"POST",
    body:{
        "prompt":"A dog in boot",
        "n":1,
        "size":"medium"
    }
})
```
prompt -> user search query words 
n-> number of images to be generated
size-> sizes of the image to be generated. only 3 sizes availabe 
    -large
    -small
any other size default to small. it  should be in lowercase
###### response:
```
{
  "success": true,
  "data": [
    {
      "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-kw2izXDlENCEeWtFfFrXiEbc/user-Cq4zIVAHzpqfOVKsREhUtEvD/img-2eVoW3SkASagNsPkhmbsaGd4.png?st=2022-12-14T11%3A28%3A21Z&se=2022-12-14T13%3A28%3A21Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-14T05%3A46%3A12Z&ske=2022-12-15T05%3A46%3A12Z&sks=b&skv=2021-08-06&sig=eOHqVF%2BoVHginmkreTdc5CpfJcA%2BJyIIZtEza2q/wdo%3D"
    }
  ]
```
