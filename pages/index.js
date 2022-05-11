import Layout from "../components/layouts";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import styles from "./product/slug.module.css";
import db from "../utlis/db";
import Product from "../models/Product";

export default function Home(props) {

  const {products}=props;
  return (
    <Layout>
      <div>
        <Typography>Products</Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <Link href={`/product/${product.slug}`}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="400"
                    image={product.image}
                    alt={product.name}
                    title={product.name}
                  />
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
                </Link>
               

                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button size="small" color="primary" className={styles.textmaincolor}>
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(){
  await db.connect();
  const products=await Product.find({}).lean();
  await db.disconnect();
  return{
    props:{
      products:products.map(db.convertDocToObj),
    },
  };

}