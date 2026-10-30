
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Store,
  UserRound,
  MapPin,
  Truck,
  Bell,
  Save,
  Upload,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

type Settings = {
  storeName: string;
  storeSlug: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  processingDays: string;
  shippingFee: string;
  freeShippingMinimum: string;
  returnWindow: string;
  returnPolicy: string;
  emailOrders: boolean;
  emailMarketing: boolean;
  lowStockAlerts: boolean;
};

const initialSettings: Settings = {
  storeName: "Desai Lifestyle Store",
  storeSlug: "desai-lifestyle",
  description:
    "Quality products for everyday living, carefully selected for our customers.",
  email: "store@example.com",
  phone: "9876543210",
  website: "",
  address: "Shop 12, Market Road",
  city: "Ratnagiri",
  state: "Maharashtra",
  pincode: "415612",
  processingDays: "2",
  shippingFee: "50",
  freeShippingMinimum: "999",
  returnWindow: "7",
  returnPolicy:
    "Items must be unused and returned in their original packaging. Certain categories may not be eligible for returns.",
  emailOrders: true,
  emailMarketing: false,
  lowStockAlerts: true,
};

export default function VendorSettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState("Store profile");
  const [logoPreview, setLogoPreview] = useState("");
  const [notice, setNotice] = useState("");
  const [logoError, setLogoError] = useState("");

  const tabs = [
    { name: "Store profile", icon: Store },
    { name: "Contact details", icon: UserRound },
    { name: "Shipping & returns", icon: Truck },
    { name: "Notifications", icon: Bell },
  ];

  function updateField<K extends keyof Settings>(
    field: K,
    value: Settings[K]
  ) {
    setSettings((current) => ({ ...current, [field]: value }));
    setNotice("");
  }

  function handleLogoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setLogoError("Please choose an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setLogoError("Choose an image smaller than 2 MB.");
      return;
    }

    setLogoError("");
    setLogoPreview(URL.createObjectURL(file));
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!settings.storeName.trim()) {
      setNotice("Store name is required.");
      setActiveTab("Store profile");
      return;
    }

    if (
      settings.pincode &&
      !/^\d{6}$/.test(settings.pincode)
    ) {
      setNotice("Enter a valid 6-digit Indian PIN code.");
      setActiveTab("Contact details");
      return;
    }

    if (
      settings.phone &&
      !/^\d{10}$/.test(settings.phone)
    ) {
      setNotice("Enter a valid 10-digit phone number.");
      setActiveTab("Contact details");
      return;
    }

    if (
      Number(settings.shippingFee) < 0 ||
      Number(settings.freeShippingMinimum) < 0 ||
      !Number.isFinite(Number(settings.shippingFee)) ||
      !Number.isFinite(Number(settings.freeShippingMinimum))
    ) {
      setNotice("Shipping amounts must be valid, non-negative numbers.");
      setActiveTab("Shipping & returns");
      return;
    }

    setNotice(
      "Settings validated. Connect a backend to persist these changes."
    );
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  const labelClass = "text-sm font-medium text-gray-700";

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Store settings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your storefront profile, shipping, and preferences.
          </p>
        </div>

        {notice && (
          <div
            role="status"
            className="mb-6 flex items-start gap-3 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800"
          >
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-4">
          {/* Sidebar navigation */}
          <aside className="rounded-xl border border-gray-200 bg-white p-3">
            <p className="px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Settings
            </p>

            <nav className="flex gap-2 overflow-x-auto lg:flex-col">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const selected = activeTab === tab.name;

                return (
                  <button
                    key={tab.name}
                    type="button"
                    onClick={() => setActiveTab(tab.name)}
                    className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                      selected
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={18} />
                    {tab.name}
                  </button>
                );
              })}
            </nav>

            <div className="mt-5 hidden rounded-lg bg-gray-50 p-4 lg:block">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                <Store size={17} className="text-indigo-600" />
                Store status
              </div>
              <p className="mt-2 text-xs leading-5 text-gray-500">
                Your storefront is using demo settings. Changes are not yet
                saved to a database.
              </p>
            </div>
          </aside>

          {/* Settings form */}
          <form
            onSubmit={handleSave}
            className="min-w-0 space-y-6 lg:col-span-3"
          >
            {activeTab === "Store profile" && (
              <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
                <div className="border-b border-gray-100 pb-5">
                  <h2 className="font-semibold text-gray-900">
                    Store profile
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    This information represents your store on the marketplace.
                  </p>
                </div>

                <div className="mt-6">
                  <label className={labelClass}>Store logo</label>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <div className="flex size-20 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Store logo preview"
                          className="size-full object-cover"
                        />
                      ) : (
                        <Store size={30} className="text-gray-400" />
                      )}
                    </div>

                    <div>
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                        <Upload size={15} />
                        Upload logo
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleLogoChange}
                        />
                      </label>
                      <p className="mt-2 text-xs text-gray-400">
                        Images only, maximum 2 MB.
                      </p>
                      {logoError && (
                        <p className="mt-1 text-xs text-red-600">
                          {logoError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="storeName">
                      Store name *
                    </label>
                    <input
                      id="storeName"
                      required
                      value={settings.storeName}
                      onChange={(e) =>
                        updateField("storeName", e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="storeSlug">
                      Store URL slug
                    </label>
                    <input
                      id="storeSlug"
                      value={settings.storeSlug}
                      onChange={(e) =>
                        updateField(
                          "storeSlug",
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]/g, "-")
                        )
                      }
                      className={inputClass}
                    />
                    <p className="mt-1.5 text-xs text-gray-400">
                      Example: /stores/{settings.storeSlug || "your-store"}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="description">
                      Store description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      maxLength={500}
                      value={settings.description}
                      onChange={(e) =>
                        updateField("description", e.target.value)
                      }
                      className={inputClass}
                    />
                    <p className="mt-1 text-right text-xs text-gray-400">
                      {settings.description.length}/500
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="website">
                      Website URL
                    </label>
                    <input
                      id="website"
                      type="url"
                      placeholder="https://yourstore.com"
                      value={settings.website}
                      onChange={(e) =>
                        updateField("website", e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>
            )}

            {activeTab === "Contact details" && (
              <>
                <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
                  <h2 className="font-semibold text-gray-900">
                    Contact information
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Keep your business contact details up to date.
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="email">
                        Business email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) =>
                          updateField("email", e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="phone">
                        Phone number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={settings.phone}
                        onChange={(e) =>
                          updateField(
                            "phone",
                            e.target.value.replace(/\D/g, "").slice(0, 10)
                          )
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>
                </section>

                <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={19} className="text-indigo-600" />
                    <h2 className="font-semibold text-gray-900">
                      Business address
                    </h2>
                  </div>

                  <div className="mt-5 space-y-5">
                    <div>
                      <label className={labelClass} htmlFor="address">
                        Street address
                      </label>
                      <input
                        id="address"
                        value={settings.address}
                        onChange={(e) =>
                          updateField("address", e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelClass} htmlFor="city">
                          City
                        </label>
                        <input
                          id="city"
                          value={settings.city}
                          onChange={(e) =>
                            updateField("city", e.target.value)
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass} htmlFor="state">
                          State
                        </label>
                        <input
                          id="state"
                          value={settings.state}
                          onChange={(e) =>
                            updateField("state", e.target.value)
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass} htmlFor="pincode">
                          PIN code
                        </label>
                        <input
                          id="pincode"
                          inputMode="numeric"
                          maxLength={6}
                          value={settings.pincode}
                          onChange={(e) =>
                            updateField(
                              "pincode",
                              e.target.value.replace(/\D/g, "").slice(0, 6)
                            )
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {activeTab === "Shipping & returns" && (
              <>
                <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
                  <div className="flex items-center gap-2">
                    <Truck size={19} className="text-indigo-600" />
                    <h2 className="font-semibold text-gray-900">
                      Shipping preferences
                    </h2>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Set your default order preparation and shipping charges.
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        className={labelClass}
                        htmlFor="processingDays"
                      >
                        Processing time
                      </label>
                      <select
                        id="processingDays"
                        value={settings.processingDays}
                        onChange={(e) =>
                          updateField("processingDays", e.target.value)
                        }
                        className={inputClass}
                      >
                        <option value="1">1 business day</option>
                        <option value="2">2 business days</option>
                        <option value="3">3 business days</option>
                        <option value="5">5 business days</option>
                        <option value="7">7 business days</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="shippingFee">
                        Standard shipping fee (₹)
                      </label>
                      <input
                        id="shippingFee"
                        type="number"
                        min="0"
                        step="1"
                        value={settings.shippingFee}
                        onChange={(e) =>
                          updateField("shippingFee", e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        className={labelClass}
                        htmlFor="freeShippingMinimum"
                      >
                        Free shipping above (₹)
                      </label>
                      <input
                        id="freeShippingMinimum"
                        type="number"
                        min="0"
                        step="1"
                        value={settings.freeShippingMinimum}
                        onChange={(e) =>
                          updateField(
                            "freeShippingMinimum",
                            e.target.value
                          )
                        }
                        className={inputClass}
                      />
                      <p className="mt-1.5 text-xs text-gray-400">
                        This is a demo setting; it will not change checkout
                        calculations until connected.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
                  <h2 className="font-semibold text-gray-900">
                    Returns & refunds
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Configure your default return policy for eligible products.
                  </p>

                  <div className="mt-5">
                    <label className={labelClass} htmlFor="returnWindow">
                      Return window
                    </label>
                    <select
                      id="returnWindow"
                      value={settings.returnWindow}
                      onChange={(e) =>
                        updateField("returnWindow", e.target.value)
                      }
                      className={inputClass}
                    >
                      <option value="0">No returns</option>
                      <option value="3">3 days</option>
                      <option value="7">7 days</option>
                      <option value="10">10 days</option>
                      <option value="15">15 days</option>
                    </select>
                  </div>

                  <div className="mt-5">
                    <label className={labelClass} htmlFor="returnPolicy">
                      Return policy details
                    </label>
                    <textarea
                      id="returnPolicy"
                      rows={5}
                      value={settings.returnPolicy}
                      onChange={(e) =>
                        updateField("returnPolicy", e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>
                </section>
              </>
            )}

            {activeTab === "Notifications" && (
              <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <Bell size={19} className="text-indigo-600" />
                  <h2 className="font-semibold text-gray-900">
                    Notification preferences
                  </h2>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Choose which alerts you want to receive.
                </p>

                <div className="mt-6 divide-y divide-gray-100">
                  <ToggleRow
                    title="Order notifications"
                    description="Receive alerts when a new order is placed."
                    checked={settings.emailOrders}
                    onChange={(value) => updateField("emailOrders", value)}
                  />
                  <ToggleRow
                    title="Low stock alerts"
                    description="Get notified when a product needs restocking."
                    checked={settings.lowStockAlerts}
                    onChange={(value) =>
                      updateField("lowStockAlerts", value)
                    }
                  />
                  <ToggleRow
                    title="Marketplace updates"
                    description="Receive platform announcements and optional promotional emails."
                    checked={settings.emailMarketing}
                    onChange={(value) =>
                      updateField("emailMarketing", value)
                    }
                  />
                </div>

                <p className="mt-5 rounded-lg bg-gray-50 p-3 text-xs leading-5 text-gray-500">
                  These preferences update the demo form only. Actual email
                  notifications require a backend notification service.
                </p>
              </section>
            )}

            {/* Save action */}
            <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setSettings(initialSettings);
                  setLogoPreview("");
                  setLogoError("");
                  setNotice("Demo settings reset to their original values.");
                }}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Reset demo settings
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <Save size={16} />
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-5">
      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="mt-1 text-sm leading-5 text-gray-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
          checked ? "bg-indigo-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block size-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
