import Box from "@mui/material/Box";



const Dog = ()=>{
    return (
        <>
        <Box 
            sx={{
                height:350,
                width:350,
                alignSelf:"center",
                position:"relative",
                top:50,
                overflow:"hidden",
                padding:1,
                display:"flex",
                flexDirection:"column",
                alignItems:"center"
            }}
        >
            <div
                 style={{height:280 , width:280}}
            >
                <img src="./public/dog_img.png" style={{objectFit:"cover" , height:"100%", width:"100%" , borderRadius:"12px"}}/>
            </div>
            <p style={{fontWeight:"600"}}>Hi there ! I am Your Proffesor Bella , Ask Me Anything Below .</p>
        </Box>
        </>
    )
}

export default Dog