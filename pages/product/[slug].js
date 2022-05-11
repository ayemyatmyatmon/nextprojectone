import React from "react";
import data from "../../utlis/data";
import Layout from "../../components/layouts";
import Link from "next/link";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import styles from "./slug.module.css";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Product from "../../models/Product";
import db from "../../utlis/db";
import { Store } from "../../utlis/Store";
import { useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function productScreen(props) {
  const router=useRouter();

  const { dispatch } = useContext(Store);

  const { product } = props;
  if (!product) {
    return (
      <div>
        <h1>Product Not Found</h1>
      </div>
    );
  }
  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock <= 0) {
      window.alert("Sorry This Product is Out of Stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: 1 } });
    router.push('/cart');
  };

  return (
    <Layout>
      <div className={styles.backtoproduct}>
        <Link href="/">
          Back To Product
          {/* <a className={styles.textmaincolor}>Back To Product</a> */}
        </Link>
      </div>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            width={360}
            height={400}
            layout="responsive"
          ></Image>
        </Grid>

        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography>{product.name}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Category : {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand : {product.brand}</Typography>
            </ListItem>

            <ListItem>
              <Typography>
                Rating :<StarIcon className={styles.iconstar} />{" "}
                {product.rating} , ({product.numReviews}) reviews
              </Typography>
            </ListItem>

            <ListItem>
              <Typography>Description : {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>

        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>

                  <Grid item md={6}>
                    <Typography> ${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>

                  <Grid item md={6}>
                    <Typography>
                      {product.countInStock > 0 ? "In stock" : "Unavaliable"}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  className={styles.backgroundmaincolor}
                  variant="contained"
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
