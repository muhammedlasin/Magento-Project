<?php declare(strict_types=1);

namespace TerrificMinds\CustomerAcceptance\Block\Checkout\LayoutProcessor;

use Magento\Checkout\Block\Checkout\LayoutProcessorInterface;

class CustomerAcceptance implements LayoutProcessorInterface
{
    protected $scopeConfig;
    protected $checkoutSession;
    protected $quoteRepository;
    private $cart;

    public function __construct(
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        \Magento\Checkout\Model\Session $checkoutSession, \Magento\Quote\Model\QuoteRepository $quoteRepository,
        \Magento\Checkout\Model\Cart $cart
    )
    {
        $this->scopeConfig = $scopeConfig;
        $this->checkoutSession = $checkoutSession;
        $this->quoteRepository = $quoteRepository;
        $this->cart = $cart;
    }
    public function process($jsLayout): array
    {
        $countryList = $this->scopeConfig->getValue(
            "customeracceptance/general/specificcountry",
                \Magento\Store\Model\ScopeInterface::SCOPE_STORE,
        null
        );

        $status = $this->scopeConfig->getValue(
            "customeracceptance/general/enable",
                \Magento\Store\Model\ScopeInterface::SCOPE_STORE,
        null
        );

        $threshold = $this->scopeConfig->getValue(
            "customeracceptance/general/threshold",
                \Magento\Store\Model\ScopeInterface::SCOPE_STORE,
        null
        );

        $quoteId = $this->checkoutSession->getQuoteId();
        $quote = $this->quoteRepository->get($quoteId);
        $s = $quote['grand_total'];

        $estimated_country = $this->cart->getQuote()->getShippingAddress()->getCountryId();




        $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']['shippingAddress']['children']['shipping-address-fieldset']['children']['custom-checkbox']['myKey'] = $countryList;

        $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']['shippingAddress']['children']['shipping-address-fieldset']['children']['custom-checkbox']['myKey2'] = $status;

        $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']['shippingAddress']['children']['shipping-address-fieldset']['children']['custom-checkbox']['myKey3'] = $threshold;

        $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']['shippingAddress']['children']['shipping-address-fieldset']['children']['custom-checkbox']['myKey4'] = $s;

        $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']['shippingAddress']['children']['shipping-address-fieldset']['children']['custom-checkbox']['myKey5'] = $estimated_country;



        return $jsLayout;
    }
}