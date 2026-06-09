import Service from "../models/Service.js";

const defaultServices = [
    {
        name: "Stock Manager",
        slug: "stock-manager",
        description: "Inventory and stock management system",
        apiBaseUrl: "http://localhost:5001/api",
        provisionEndpoint: "http://localhost:5001/api/internal/provision",
        frontendRoute: "/stock",
        currentVersion: "1.0.0",
    },
    {
        name: "CRM",
        slug: "crm",
        description: "Customer relationship management system",
        apiBaseUrl: "http://localhost:5002/api",
        provisionEndpoint: "http://localhost:5002/api/internal/provision",
        frontendRoute: "/crm",
        currentVersion: "1.0.0",
    },
    {
        name: "ERP",
        slug: "erp",
        description: "Enterprise resource planning system",
        apiBaseUrl: "http://localhost:5003/api",
        provisionEndpoint: "http://localhost:5003/api/internal/provision",
        frontendRoute: "/erp",
        currentVersion: "1.0.0",
    },
    {
        name: "POS",
        slug: "pos",
        description: "Point of sale system",
        apiBaseUrl: "http://localhost:5004/api",
        provisionEndpoint: "http://localhost:5004/api/internal/provision",
        frontendRoute: "/pos",
        currentVersion: "1.0.0",
    },
    {
        name: "Billing Software",
        slug: "billing-software",
        description: "GST billing and invoicing solution",
        apiBaseUrl: "http://localhost:5005/api",
        provisionEndpoint: "http://localhost:5005/api/internal/provision",
        frontendRoute: "/billing",
        currentVersion: "1.0.0",
    },
];

const seedServices = async () => {
    try {
        for (const serviceData of defaultServices) {
            const exists = await Service.findOne({
                slug: serviceData.slug,
            });

            if (!exists) {
                await Service.create(serviceData);

                console.log(
                    `Service seeded: ${serviceData.name}`
                );
            }
        }

        console.log(
            "Service seeding completed"
        );
    } catch (error) {
        console.error(
            "Service seeding failed:",
            error.message
        );
    }
};

export default seedServices;