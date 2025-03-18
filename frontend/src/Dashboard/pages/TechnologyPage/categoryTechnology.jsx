import React, { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import NewPageBreadcrumb from "../../components/common/NewPageBreadcrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import TextArea from "../../components/form/input/TextArea";
import CategoryTable from "./CategoryTable";
import Button from "../../components/ui/button/Button";

export default function CategoryTechnology() {
    const options = [
        { value: "Frontend", label: "Frontend" },
        { value: "Backend", label: "Backend" },
        // { value: "development", label: "Development" },
    ];
    const handleSelectChange = () => {
        console.log("Selected value:", value);
    };

    return (
        <>
            <PageMeta
                title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <div></div>
            <NewPageBreadcrumb pageTitle="Category" />
            <div className="space-y-3 grid grid-cols-[3fr_2fr] gap-6">
                <div className="space-y-6">
                    <h4>Add New Category</h4>
                    <div className="">
                        <Label htmlFor="input">Name</Label>
                        <Input type="text" id="input" placeholder="Name" />
                    </div>
                    <div className="">
                        <Label htmlFor="input">Slug</Label>
                        <Input type="text" id="input" placeholder="Slug" />
                    </div>

                    <div>
                        <Label>Select Input</Label>
                        <Select
                            options={options}
                            placeholder="Select Option"
                            onChange={handleSelectChange}
                            className="dark:bg-dark-900"
                        />
                    </div>

                    <div>
                        <Label>Description</Label>

                        <TextArea hint={""} />
                    </div>

                    <div className="cursor-pointer flex justify-CENTER">
                        <Button
                            size="sm"
                            variant="outline"
                            // startIcon={<span>🚀</span>}
                            // onClick={() => alert('New Technology Added!')}
                            className="cursor-pointer"
                        >
                            Publish
                        </Button>
                    </div>
                </div>
                <div>
                    <ComponentCard title="Category Table">
                        <CategoryTable />
                    </ComponentCard>
                </div>
            </div>
        </>
    );
}
