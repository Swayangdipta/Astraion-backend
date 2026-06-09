import Package from "../models/Package.js";
import Service from "../models/Service.js";

const seedPackages = async () => {

    try {

        const stock =
            await Service.findOne({
                slug: "stock-manager",
            });

        const crm =
            await Service.findOne({
                slug: "crm",
            });

        if (!stock || !crm) {
            console.log(
                "Services must be seeded first"
            );
            return;
        }

        const packages = [

            {
                service: stock._id,

                name: "Starter",

                price: 499,

                billingCycle:
                    "MONTHLY",

                trialDays: 7,

                features: [
                    "Inventory Management",
                    "Basic Reports",
                ],

                featureFlags: {
                    exportExcel:
                        false,

                    aiAssistant:
                        false,
                },
            },

            {
                service: stock._id,

                name: "Business",

                price: 999,

                billingCycle:
                    "MONTHLY",

                trialDays: 14,

                features: [
                    "Inventory",
                    "Reports",
                    "Excel Export",
                ],

                featureFlags: {
                    exportExcel:
                        true,

                    aiAssistant:
                        true,
                },
            },

            {
                service: crm._id,

                name: "Starter",

                price: 799,

                billingCycle:
                    "MONTHLY",

                trialDays: 7,

                features: [
                    "Leads",
                    "Contacts",
                ],

                featureFlags: {
                    exportExcel:
                        false,

                    aiAssistant:
                        false,
                },
            },

        ];

        for (const pkg of packages) {

            const exists =
                await Package.findOne({
                    service:
                        pkg.service,

                    name:
                        pkg.name,

                    billingCycle:
                        pkg.billingCycle,
                });

            if (!exists) {

                await Package.create(
                    pkg
                );

                console.log(
                    `Seeded package: ${pkg.name}`
                );
            }
        }

        console.log(
            "Package seeding completed"
        );

    } catch (error) {

        console.error(
            "Package seed error:",
            error.message
        );
    }
};

export default seedPackages;