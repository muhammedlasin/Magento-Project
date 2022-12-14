<?php
namespace TerrificMinds\CustomerAcceptance\Observer;


class Emailtemplatevars implements \Magento\Framework\Event\ObserverInterface
{
    protected $helper;
    protected $quoteRepository;
    protected $checkoutSession;


    public function __construct(\Magento\Checkout\Model\Session $checkoutSession, \Magento\Quote\Model\QuoteRepository $quoteRepository)
    {
        $this->checkoutSession = $checkoutSession;
        $this->quoteRepository = $quoteRepository;
    }

    public function execute(\Magento\Framework\Event\Observer $observer)
    {
        $quoteId = $this->checkoutSession->getQuoteId();
        $quote = $this->quoteRepository->get($quoteId);

        $transport = $observer->getTransport();
        if ($quote['agree'] == 1) {
            $transport['Customvariable1'] = "Yes";
        } else {
            $transport['Customvariable1'] = "No";
        }
        //add multiple parameter
    }
}