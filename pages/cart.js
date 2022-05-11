import { useContext } from "react";
import { Store } from "../utlis/Store";
import Layout from "../components/layouts";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import dynamic from "next/dynamic";
import axios from "axios";

function CartScreen() {
  const { state,dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler=async (item,quantity)=>{
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock <= 0) {
      window.alert("Sorry This Product is Out of Stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity} });
  };
  const removeItemHandler=async(item)=>{
    dispatch({type:'CART_REMOVE_ITEM',payload:item});
  }
  return (
    <Layout title="Shopping Cart">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div>
          Cart is empty.<Link href="">Go Shopping</Link>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Image</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell align="right">
                        <Link href={`/product/${item.slug}`}>
                          <a>
                            <Image
                              src={item.image}
                              width={50}
                              height={50}
                              alt={item.name}
                            ></Image>
                          </a>
                        </Link>
                      </TableCell>

                      <TableCell align="right">
                        <Link href={`/product/${item.slug}`}>
                          <a>
                            <Typography>{item.name}</Typography>
                          </a>
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          value={item.quantity}
                          onChange={(e)=>updateCartHandler(item,e.target.value)}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">
                        <Button variant="contained" color="error" onClick={()=>removeItemHandler(item)}>
                          X
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h6">
                    Subtotal ({cartItems.reduce((a,c)=> a+c.quantity,0)}{' '}items):
                    ${' '}{cartItems.reduce((a,c)=>a+c.quantity *c.price,0)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button color="primary" variant ="contained" fullWidth> Check Out</Button>
                </ListItem>

              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default dynamic(()=>Promise.resolve(CartScreen),{ssr:false});