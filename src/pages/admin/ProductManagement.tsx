import { useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";
import { Product } from "../../models/Product.model";
import { useProduct } from "../../contexts/Product.context";
import Table from "../../components/Table";
import MessageBox from "../../components/MessageBox";
import CreateProductForm from "../../components/admin/CreateProductForm";
import EditProductForm from "../../components/admin/EditProductForm";
import CustomAlert from "../../components/Alert";

export default function ProductManagement() {
  const [openAlert, setOpenAlert] = useState(false);
  const [AlertMessage, setAlertMessage] = useState("");
  const [AlertType, setAlertType] = useState<
    "Info" | "Success" | "Warning" | "Error"
  >("Info");
  const [OpenCreateForm, setOpenCreateForm] = useState(false);
  const [OpenEditForm, setOpenEditForm] = useState(false);
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    buttons: null as React.ReactNode | null,
  });
  const { Products, fetchOneProduct, deleteProduct, isLoading } = useProduct();
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    notes: [],
    rating: 0,
    image: [],
    inStock: 1,
    description: "",
    metadata: [],
    stripeProductID: "",
    stripePriceID: "",
  });

  const [selected, setSelected] = useState(false);

  const handleSelectedProduct = (id: string) => {
    setSelected(!selected); //bascule entre true et false. permet d'afficher le bouton modifier se suprimer
    fetchOneProduct(id).then((selectedProduct) => {
      if (selectedProduct) {
        setProduct(selectedProduct);
        console.log(product);
      }
    });
  };

  const handleUpdateButton = () => {
    setOpenEditForm(true);
  };

  const handleDeleteButton = () => {
    if (product.id) {
      setDialog({
        isOpen: true,
        title: "Delete Product",
        message: "Are you sure you want to delete this product?",
        buttons: (
          <div className="flex flex-row gap-2 ml-5 ">
            <Button
              onClick={() => {
                try {
                  if (product.id) {
                    deleteProduct(product.id);
                    setDialog({ ...dialog, isOpen: false });
                    setOpenAlert(true);
                    setAlertType("Success");
                    setAlertMessage("Produit supprimer avec success !");
                  }
                } catch (error: any) {
                  setDialog({ ...dialog, isOpen: false });
                  setOpenEditForm(false);
                  setOpenAlert(true);
                  setAlertType("Error");
                  if (error.response?.status === 404) {
                    setAlertMessage("le produit n'existe pas");
                  } else {
                    setAlertMessage("une errreur s'est produite");
                  }
                }
              }}
              color="red"
            >
              confirmer
            </Button>
            <Button onClick={() => setDialog({ ...dialog, isOpen: false })}>
              Annuler
            </Button>
          </div>
        ),
      });
    } else {
      alert("Please select a product to delete");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner height={100} width={100} />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center w-full relative mx-0 px-4 pt-[10%] bg-[#f8f5f1]">
      <MessageBox
        isOpen={dialog.isOpen}
        title={dialog.title}
        message={dialog.message}
        buttons={dialog.buttons}
      />
      <div className="flex flex-col justify-between items-center">
        {OpenCreateForm ? (
          <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
            <CreateProductForm setOpen={setOpenCreateForm} />
          </div>
        ) : null}
        {OpenEditForm ? (
          <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
            <EditProductForm
              setOpen={setOpenEditForm}
              productToUpdate={product}
            />
          </div>
        ) : null}
        <Table
          setSelectedId={handleSelectedProduct}
          name="Produits"
          data={Products.map((p) => ({
            image: (
              <img
                src={p.image[0]}
                alt="img"
                className="w-16 h-16 object-cover rounded "
              />
            ),
            name: p.name,
            description: p.description,
            inStock: p.inStock,
            price: `${p.price} $CA`,
            notes: p.notes.join(", "),
            id: p.id,
          }))}
          columns={[
            "image",
            "name",
            "description",
            "inStock",
            "price",
            "notes",
          ]}
        />
        {openAlert ? (
          <CustomAlert
            AlertButton={
              <Button
                variant="text"
                color="white"
                size="sm"
                className="!absolute top-3 right-3"
                onClick={() => setOpenAlert(true)}
              >
                Close
              </Button>
            }
            Message={AlertMessage}
            AlertType={AlertType}
          />
        ) : null}
        <div className="flex justify-center items-center w-[50%]">
          {selected ? (
            <>
              <Button color="white" onClick={handleUpdateButton}>
                Modifier le produit
              </Button>
              <Button color="red" onClick={handleDeleteButton}>
                Supprimerle produit
              </Button>
            </>
          ) : (
            <Button onClick={() => setOpenCreateForm(true)}>
              Ajouter un produit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
