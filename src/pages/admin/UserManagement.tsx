import { useState, useEffect } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";
import Table from "../../components/Table";
import { X } from "lucide-react";
import { useUser } from "../../contexts/user.context";
import { UserCreate, User as UserModel } from "../../models/User.model";

export default function UserManagement() {
  const { users, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  const [formUser, setFormUser] = useState<Partial<UserCreate>>({
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
    phone: "",
    address: "",
    password: "",
  });

  const handleSelected = (id: string) => {
    const u = users?.find((u) => u.id === id) || null;
    if (u) {
      setSelectedUser(u);
      setFormUser({
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        role: u.role,
        phone: u.phone,
        address: u.address,
        password: u.password,
      });
      setIsOpen(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      // TODO: appeler updateUser(selectedUser.id, formUser)
    } else {
      // TODO: appeler createUser(formUser)
    }
    setIsOpen(false);
  };

  const renderEditForm = () => (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-6 w-[90%] max-w-xl bg-white p-6 rounded-xl shadow-lg"
    >
      <Typography variant="h2" className="mb-4">
        Edit User
      </Typography>
      <X
        className="absolute top-4 right-4 cursor-pointer"
        onClick={() => setIsOpen(false)}
      />
      <Input
        label="First Name"
        crossOrigin={"anonymous"}
        value={formUser.firstName || ""}
        onChange={(e) =>
          setFormUser((prev) => ({ ...prev, firstName: e.target.value }))
        }
        required
      />
      <Input
        label="Last Name"
        crossOrigin={"anonymous"}
        value={formUser.lastName || ""}
        onChange={(e) =>
          setFormUser((prev) => ({ ...prev, lastName: e.target.value }))
        }
        required
      />
      <Input
        label="Role"
        crossOrigin={"anonymous"}
        value={formUser.role || ""}
        onChange={(e) =>
          setFormUser((prev) => ({
            ...prev,
            role: e.target.value as "user" | "admin",
          }))
        }
        required
      />
      <Input
        label="Phone"
        crossOrigin={"anonymous"}
        value={formUser.phone || ""}
        onChange={(e) =>
          setFormUser((prev) => ({ ...prev, phone: e.target.value }))
        }
        required
      />
      <Input
        label="Address"
        crossOrigin={"anonymous"}
        value={formUser.address || ""}
        onChange={(e) =>
          setFormUser((prev) => ({ ...prev, address: e.target.value }))
        }
        required
      />
      <Input
        label="Password"
        type="password"
        crossOrigin={"anonymous"}
        value={formUser.password || ""}
        onChange={(e) =>
          setFormUser((prev) => ({ ...prev, password: e.target.value }))
        }
        required
      />
      <div className="flex gap-4">
        <Button
          type="submit"
          color="black"
          className="w-full"
          disabled={isLoading}
        >
          Update
        </Button>
        <Button
          type="button"
          variant="outlined"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );

  const renderCreateForm = () => (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-6 w-[90%] max-w-xl bg-white p-6 rounded-xl shadow-lg"
    >
      <Typography variant="h2" className="mb-4">
        Create User
      </Typography>
      <X
        className="absolute top-4 right-4 cursor-pointer"
        onClick={() => setIsOpen(false)}
      />
      <Input
        label="First Name"
        crossOrigin={"anonymous"}
        value={formUser.firstName || ""}
        onChange={(e) =>
          setFormUser((prev) => ({ ...prev, firstName: e.target.value }))
        }
        required
      />
      <Input
        label="Last Name"
        crossOrigin={"anonymous"}
        value={formUser.lastName || ""}
        onChange={(e) =>
          setFormUser((prev) => ({ ...prev, lastName: e.target.value }))
        }
        required
      />
      <Input
        label="Email"
        crossOrigin={"anonymous"}
        value={formUser.email || ""}
        onChange={(e) =>
          setFormUser((prev) => ({ ...prev, email: e.target.value }))
        }
        required
      />
      <Input
        label="Phone"
        crossOrigin={"anonymous"}
        value={formUser.phone || ""}
        onChange={(e) =>
          setFormUser((prev) => ({ ...prev, phone: e.target.value }))
        }
        required
      />
      <Input
        label="Address"
        crossOrigin={"anonymous"}
        value={formUser.address || ""}
        onChange={(e) =>
          setFormUser((prev) => ({ ...prev, address: e.target.value }))
        }
        required
      />
      <Input
        label="Password"
        type="password"
        crossOrigin={"anonymous"}
        value={formUser.password || ""}
        onChange={(e) =>
          setFormUser((prev) => ({ ...prev, password: e.target.value }))
        }
        required
      />
      <Input
        label="Role"
        crossOrigin={"anonymous"}
        value={formUser.role || ""}
        onChange={(e) =>
          setFormUser((prev) => ({
            ...prev,
            role: e.target.value as "user" | "admin",
          }))
        }
        required
      />
      <div className="flex gap-4">
        <Button
          type="submit"
          color="black"
          className="w-full"
          disabled={isLoading}
        >
          Create
        </Button>
        <Button
          type="button"
          variant="outlined"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );

  return (
    <div className="container mx-auto px-4 pt-[10%] pb-[10%]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-xl"
            >
              {selectedUser ? renderEditForm() : renderCreateForm()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Table
        name="Users"
        data={
          users?.map((u) => ({
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            role: u.role,
            id: u.id,
          })) || []
        }
        columns={["firstName", "lastName", "email", "role"]}
        setSelectedId={handleSelected}
      />

      <Button
        onClick={() => {
          setSelectedUser(null);
          setFormUser({
            firstName: "",
            lastName: "",
            email: "",
            role: "user",
            phone: "",
            address: "",
            password: "",
          });
          setIsOpen(true);
        }}
        className="mt-4"
      >
        Add New User
      </Button>
    </div>
  );
}
